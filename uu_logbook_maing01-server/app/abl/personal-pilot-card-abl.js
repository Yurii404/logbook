"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/personal-pilot-card-error.js");
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

class PersonalPilotCardAbl {

  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("logbookMain");
    this.pilotDao = DaoFactory.getDao("personalPilotCard");
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
    let validationResult = this.validator.validate("personalPilotCardDeleteDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //HDS -3 find a pilot
    let uuPersonalPilotCard = null;

    uuPersonalPilotCard = await this.pilotDao.get(awid, dtoIn.id);
    if (!uuPersonalPilotCard) {
      throw new Errors.Delete.PersonalPilotCardGetDaoFailed({ uuAppErrorMap }, { pilot: uuPersonalPilotCard.id });
    }


    //HDS - 6 delete pilot
    let uuDeletedPersonalPilotCard = null;
    uuDeletedPersonalPilotCard = await this.pilotDao.delete(awid, uuPersonalPilotCard.id);

    if (uuDeletedPersonalPilotCard) {
      throw new Errors.Delete.PersonalPilotCardDaoDeleteFailed({ uuAppErrorMap }, { id: uuPersonalPilotCard.id });
    }

    return {
      ...uuDeletedPersonalPilotCard,
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
    let validationResult = this.validator.validate("personalPilotCardGetDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //HDS -2 find a pilot
    let uuPersonalPilotCard = null;

    uuPersonalPilotCard = await this.pilotDao.get(awid, dtoIn.id);
    if (!uuPersonalPilotCard) {
      throw new Errors.Get.PersonalPilotCardGetDaoFailed({ uuAppErrorMap }, { pilot: dtoIn.id });
    }

    //HDS -3 return
    return { ...uuPersonalPilotCard, uuAppErrorMap };

  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
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
    let validationResult = this.validator.validate("personalPilotCardCreateDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3 - create via DAO
    const uuObject = { ...dtoIn, awid };
    let uuAircraft = null;

    try {
      uuAircraft = await this.pilotDao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.PersonalPilotCardDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 4 - return the
    return {
      ...uuAircraft,
      uuAppErrorMap,
    };

  }

}

module.exports = new PersonalPilotCardAbl();
