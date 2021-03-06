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
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class LogbookEntryAbl {
  constructor() {
    this.validator = Validator.load();
    this.logbookDao = DaoFactory.getDao("logbookEntry");
    this.mainDao = DaoFactory.getDao("logbookMain");
  }

  async listByPilot(awid, session, dtoIn, uuAppErrorMap = {}) {
    //HDS 2
    let uuLogbook = null;

    try {
      uuLogbook = await this.mainDao.getByAwid(awid);
    } catch (e) {
      throw new Errors.Update.LogBookMainDoesNotExist({ uuAppErrorMap }, e);
    }

    if (uuLogbook.state !== "active" && uuLogbook.state !== "underConstruction") {
      throw new Errors.Update.LogBookMainIsNotInProperState(
        { uuAppErrorMap },
        {
          awid,
          state: uuLogbook.state,
          expectedState: "active",
        }
      );
    }

    // HDS 1
    let validationResult = this.validator.validate("logBookEntryListDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //HDS 2
    if (!dtoIn.pageInfo) {
      dtoIn.pageInfo = {
        pageIndex: null,
        pageSize: null,
      };
    }
    if (!dtoIn.pageInfo.pageIndex) {
      dtoIn.pageInfo.pageIndex = 0;
    }
    if (!dtoIn.pageInfo.pageSize) {
      dtoIn.pageInfo.pageSize = 50;
    }

    if (!dtoIn.sortBy) {
      dtoIn.sortBy = "departureDate";
    }
    if (!dtoIn.order) {
      dtoIn.order = "desc";
    }

    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();

    // HDS 3

    let uuListOfIAircrafts = await this.logbookDao.listByPilot(dtoIn);

    // HDS 4
    return {
      ...uuListOfIAircrafts,
      uuAppErrorMap,
    };
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    //HDS 2
    let uuLogbook = null;

    try {
      uuLogbook = await this.mainDao.getByAwid(awid);
    } catch (e) {
      throw new Errors.Update.LogBookMainDoesNotExist({ uuAppErrorMap }, e);
    }

    if (uuLogbook.state !== "active" && uuLogbook.state !== "underConstruction") {
      throw new Errors.Update.LogBookMainIsNotInProperState(
        { uuAppErrorMap },
        {
          awid,
          state: uuLogbook.state,
          expectedState: "active",
        }
      );
    }

    // HDS 1
    let validationResult = this.validator.validate("logBookEntryListDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //HDS 2
    if (!dtoIn.pageInfo) {
      dtoIn.pageInfo = {
        pageIndex: null,
        pageSize: null,
      };
    }
    if (!dtoIn.pageInfo.pageIndex) {
      dtoIn.pageInfo.pageIndex = 0;
    }
    if (!dtoIn.pageInfo.pageSize) {
      dtoIn.pageInfo.pageSize = 50;
    }
    if (!dtoIn.sortBy) {
      dtoIn.sortBy = "departureDate";
    }
    if (!dtoIn.order) {
      dtoIn.order = "desc";
    }

    // HDS 3

    let uuListOfIAircrafts = await this.logbookDao.list(dtoIn);

    // HDS 4
    return {
      ...uuListOfIAircrafts,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    //HDS 2
    let uuLogbook = null;

    try {
      uuLogbook = await this.mainDao.getByAwid(awid);
    } catch (e) {
      throw new Errors.Update.LogBookMainDoesNotExist({ uuAppErrorMap }, e);
    }

    if (uuLogbook.state !== "active" && uuLogbook.state !== "underConstruction") {
      throw new Errors.Update.LogBookMainIsNotInProperState(
        { uuAppErrorMap },
        {
          awid,
          state: uuLogbook.state,
          expectedState: "active",
        }
      );
    }

    // HDS 1
    let validationResult = this.validator.validate("logBookEntryUpdateDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //HDS -2 find a logbook
    let uuLogbookEntry = null;

    uuLogbookEntry = await this.logbookDao.get(awid, dtoIn.id);

    if (!uuLogbookEntry) {
      throw new Errors.Update.RecordInLogBookgetDaoFailed({ uuAppErrorMap });
    }

    //HDS -3 update fields
    if (dtoIn.departureDate) {
      uuLogbookEntry.departureDate = dtoIn.departureDate;
    }
    if (dtoIn.arrivalDate) {
      uuLogbookEntry.arrivalDate = dtoIn.arrivalDate;
    }
    if (dtoIn.departurePlace) {
      uuLogbookEntry.departurePlace = dtoIn.departurePlace;
    }
    if (dtoIn.arrivalPlace) {
      uuLogbookEntry.arrivalPlace = dtoIn.arrivalPlace;
    }
    if (dtoIn.coPilotIdentity) {
      uuLogbookEntry.coPilotIdentity = dtoIn.coPilotIdentity;
    }
    if (dtoIn.entryState) {
      uuLogbookEntry.entryState = dtoIn.entryState;
    }
    if (dtoIn.regNum) {
      uuLogbookEntry.regNum = dtoIn.regNum;
    }

    //HDS - 4 update logbook entry

    uuLogbookEntry = this.logbookDao.update(uuLogbookEntry);

    if (!uuLogbookEntry) {
      throw new Errors.Update.LogBookEntryDaoUpdateFailed({ uuAppErrorMap });
    }

    return {
      ...uuLogbookEntry,
      uuAppErrorMap,
    };
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

    if (!uuLogbookEntry) {
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

    if (!uuLogbookEntry) {
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
    if (dtoIn.departureDate >= dtoIn.arrivalDate) {
      throw new Errors.Create.ArrivalDateIsNotCorrect(
        { uuAppErrorMap },
        { arrivalDate: dtoIn.arrivalDate, departureDate: dtoIn.departureDate }
      );
    }

    // HGS - 5 Validation departurePlace and arrivalPlace in dtoIn.
    if (dtoIn.departurePlace === dtoIn.arrivalPlace) {
      throw new Errors.Create.ArrivalPlaceIsNotCorrect(
        { uuAppErrorMap },
        { arrivalPlace: dtoIn.arrivalPlace, departurePlace: dtoIn.departurePlace }
      );
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
