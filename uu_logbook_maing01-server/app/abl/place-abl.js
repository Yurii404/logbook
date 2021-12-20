"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/place-error.js");
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
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class PlaceAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("logbookMain");
    this.placeDao = DaoFactory.getDao("place");
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    //HDS 2
    let uuLogbook = null;

    try {
      uuLogbook = await this.mainDao.getByAwid(awid);
    } catch (e) {
      throw new Errors.List.LogBookMainDoesNotExist({ uuAppErrorMap }, e);
    }

    if (uuLogbook.state !== "active" && uuLogbook.state !== "underConstruction") {
      throw new Errors.List.LogBookMainIsNotInProperState(
        { uuAppErrorMap },
        {
          awid,
          state: uuLogbook.state,
          expectedState: "active",
        }
      );
    }

    // HDS 1
    let validationResult = this.validator.validate("aircraftListDataDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // HDS 2

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
      dtoIn.pageInfo.pageSize = 1000;
    }

    // HDS 3

    let uuListOfIPlace = await this.placeDao.listByAwid(awid, dtoIn.pageInfo);

    // HDS 4
    return {
      ...uuListOfIPlace,
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
    let validationResult = this.validator.validate("placeDeleteDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //HDS -3 find a place
    let uuPlace = null;

    uuPlace = await this.placeDao.get(awid, dtoIn.id);
    if (!uuPlace) {
      throw new Errors.Delete.PlaceGetDaoFailed({ uuAppErrorMap }, { place: uuPlace.id });
    }

    //HDS - 4 delete place
    let uuDeletedPlace = null;
    uuDeletedPlace = await this.placeDao.delete(awid, uuPlace.id);

    if (uuDeletedPlace) {
      throw new Errors.Delete.PlaceDaoDeleteFailed({ uuAppErrorMap }, { id: uuPlace.id });
    }

    return {
      ...uuDeletedPlace,
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
    let validationResult = this.validator.validate("placeGetDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //HDS -2 find a aircraft
    let uuPlace = null;

    uuPlace = await this.placeDao.get(awid, dtoIn.id);
    if (!uuPlace) {
      throw new Errors.Get.PlaceGetDaoFailed({ uuAppErrorMap }, { aircraft: dtoIn.id });
    }

    //HDS -3 return
    return { ...uuPlace, uuAppErrorMap };
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
    let validationResult = this.validator.validate("placeCreateDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3 - create  via DAO
    let uuAircraft = null;
    const uuObject = { ...dtoIn, awid };

    try {
      uuAircraft = await this.placeDao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.PlaceDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 4 - return
    return {
      ...uuAircraft,
      uuAppErrorMap,
    };
  }
}

module.exports = new PlaceAbl();
