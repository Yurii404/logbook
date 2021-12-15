"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/logbook-entry-error.js");
const { BinaryStoreError } = require("uu_appg01_binarystore");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
};

class LogbookEntryAbl {

  constructor() {
    this.validator = Validator.load();
    this.logbookDao = DaoFactory.getDao("logbookEntry");
    this.mainDao = DaoFactory.getDao("logbookMain");
  }



  async delete(awid, dtoIn, session, uuAppErrorMap = {}) {
    //HDS 2
    let uuLogbook = null;

    try {
      uuLogbook = await this.mainDao.getByAwid(awid);
    } catch (e) {
      throw new Errors.Delete.LogBookMainDoesNotExist({ uuAppErrorMap }, e);
    }

    if (uuLogbook.state !== "active" && uuLogbook.state !== "underConstruction") {
      throw new Errors.Delete.LogBookMainIsNotInProperState(
        { uuAppErrorMap },
        {
          awid,
          state: uuLogbook.state,
          expectedState: "active",
        }
      );
    }

    // HDS 1
    let validationResult = this.validator.validate("logBookEntryDeleteDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //HDS -3 find a logbook
    let uuLogbookEntry = null;

    uuLogbookEntry = await this.logbookDao.get(awid, dtoIn.id);

    if(!uuLogbookEntry){
      throw new Errors.Delete.RecordInLogBookgetDaoFailed({ uuAppErrorMap });
    }



    //HDS - 6 delete logbook
    let uuDeletedLogbookEntry = null;
    uuDeletedLogbookEntry = await this.logbookDao.delete(awid, uuLogbookEntry.id);

    if (uuDeletedLogbookEntry) {
      throw new Errors.Delete.LogbookEntryDaoDeleteFailed({ uuAppErrorMap }, { id: uuLogbookEntry.id });
    }

    return {
      ...uuDeletedLogbookEntry,
      uuAppErrorMap,
    };

  }

  async get(awid, dtoIn, session, uuAppErrorMap = {}) {
    //HDS 2
    let uuLogbook = null;

    try {
      uuLogbook = await this.mainDao.getByAwid(awid);
    } catch (e) {
      throw new Errors.Get.LogBookMainDoesNotExist({ uuAppErrorMap }, e);
    }

    if (uuLogbook.state !== "active" && uuLogbook.state !== "underConstruction") {
      throw new Errors.Get.LogBookMainIsNotInProperState(
        { uuAppErrorMap },
        {
          awid,
          state: uuLogbook.state,
          expectedState: "active",
        }
      );
    }

    // HDS 1
    let validationResult = this.validator.validate("logBookEntryGetDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //HDS -2 find a logbook
    let uuLogbookEntry = null;

    uuLogbookEntry = await this.logbookDao.get(awid, dtoIn.id);

    if(!uuLogbookEntry){
      throw new Errors.Get.RecordInLogBookgetDaoFailed({ uuAppErrorMap });
    }
    //HDS -3 return
    return { ...uuLogbookEntry, uuAppErrorMap };

  }

  async create(awid, session, dtoIn, uuAppErrorMap = {}) {
    //HDS 2
    let uuLogbook = null;

    try {
      uuLogbook = await this.mainDao.getByAwid(awid);
    } catch (e) {
      throw new Errors.Create.LogBookMainDoesNotExist({ uuAppErrorMap }, e);
    }

    if (uuLogbook.state !== "active" && uuLogbook.state !== "underConstruction") {
      throw new Errors.Create.LogBookMainIsNotInProperState(
        { uuAppErrorMap },
        {
          awid,
          state: uuLogbook.state,
          expectedState: "active",
        }
      );
    }

    // HDS 1
    let validationResult = this.validator.validate("logBookEntryCreateDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //HDS 3 - added value
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.entryState = "in_progress";

    // HDS - 4 Validation departureDate and arrivalDate in dtoIn
    if (dtoIn.departureFlight >= dtoIn.arrivalFlight) {
      throw new Errors.Create.ArrivalDateIsNotCorrect({ uuAppErrorMap }, { arrivalDate: dtoIn.arrivalDate, departureDate: dtoIn.departureDate });
    }

    // HGS - 5 Validation departurePlace and arrivalPlace in dtoIn.
    if (dtoIn.departurePlace === dtoIn.arrivalPlace) {
      throw new Errors.Create.ArrivalPlaceIsNotCorrect({ uuAppErrorMap }, { arrivalPlace: dtoIn.arrivalPlace, departurePlace: dtoIn.departurePlace });
    }

    // HDS 6 - create via DAO
    let uuLogbookEntry = { awid, ...dtoIn };

    try {
      uuLogbookEntry = await this.logbookDao.create(uuLogbookEntry);
    } catch (err) {
      throw new Errors.Create.LogBookEntryDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 7 - return the
    return {
      ...uuLogbookEntry,
      uuAppErrorMap,
    };

  }

}

module.exports = new LogbookEntryAbl();
