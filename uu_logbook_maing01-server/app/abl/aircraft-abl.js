"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/aircraft-error.js");
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
  getAircraftImageUnsupportedKeys: {
    code: `${Errors.GetAircraftImage.UC_CODE}unsupportedKeys`,
  },
  setStateUnsupportedKeys: {
    code: `${Errors.SetState.UC_CODE}unsupportedKeys`,
  },
};

class AircraftAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("logbookMain");
    this.aircraftDao = DaoFactory.getDao("aircraft");
    this.aircraftImageDao = DaoFactory.getDao("aircraftImage");
  }

  async setState(awid, dtoIn, uuAppErrorMap = {}) {
    //HDS 2
    let uuLogbook = null;

    try {
      uuLogbook = await this.mainDao.getByAwid(awid);
    } catch (e) {
      throw new Errors.SetState.LogBookMainDoesNotExist({ uuAppErrorMap }, e);
    }

    if (uuLogbook.state !== "active" && uuLogbook.state !== "underConstruction") {
      throw new Errors.SetState.LogBookMainIsNotInProperState(
        { uuAppErrorMap },
        {
          awid,
          state: uuLogbook.state,
          expectedState: "active",
        }
      );
    }

    // HDS 1
    let validationResult = this.validator.validate("aircraftSetStateDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.setStateUnsupportedKeys.code,
      Errors.SetState.InvalidDtoIn
    );

    // HDS 3
    let uuAircraft = await this.aircraftDao.get(awid, dtoIn.id);

    if (!uuAircraft) {
      throw new Errors.SetState.AircraftGetDaoFailed({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 4

    uuAircraft.state = dtoIn.state;

    uuAircraft = await this.aircraftDao.setState(awid, dtoIn.id, uuAircraft);

    // HDS 4
    return {
      ...uuAircraft,
      uuAppErrorMap,
    };
  }

  async getAircraftImage(awid, dtoIn, uuAppErrorMap = {}) {
    //HDS 2
    let uuLogbook = null;

    try {
      uuLogbook = await this.mainDao.getByAwid(awid);
    } catch (e) {
      throw new Errors.GetAircraftImage.LogBookMainDoesNotExist({ uuAppErrorMap }, e);
    }

    if (uuLogbook.state !== "active" && uuLogbook.state !== "underConstruction") {
      throw new Errors.GetAircraftImage.LogBookMainIsNotInProperState(
        { uuAppErrorMap },
        {
          awid,
          state: uuLogbook.state,
          expectedState: "active",
        }
      );
    }

    // HDS 1
    let validationResult = this.validator.validate("aircraftGetImageDataDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getAircraftImageUnsupportedKeys.code,
      Errors.GetAircraftImage.InvalidDtoIn
    );
    // hds 2
    let image;
    try {
      image = await this.aircraftImageDao.getDataByCode(awid, dtoIn.image);
    } catch (e) {
      if (e.code === "uu-app-binarystore/objectNotFound") {
        // A3
        throw new Errors.GetAircraftImage.AircraftImageDoesNotExist({ uuAppErrorMap }, { image: dtoIn.image });
      }
      throw e;
    }

    // hds 3
    image.uuAppErrorMap = uuAppErrorMap;
    return image;
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

    let uuListOfIAircrafts = await this.aircraftDao.listByAwid(awid, dtoIn.pageInfo);

    // HDS 4
    return {
      ...uuListOfIAircrafts,
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
    let validationResult = this.validator.validate("aircraftDeleteDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //HDS -3 find a aircraft
    let uuAircraft = null;

    if (dtoIn.id) {
      uuAircraft = await this.aircraftDao.get(awid, dtoIn.id);
      if (!uuAircraft) {
        throw new Errors.Delete.AircraftGetDaoFailed({ uuAppErrorMap }, { aircraft: uuAircraft.id });
      }
    } else {
      uuAircraft = await this.aircraftDao.getByRegNumber(awid, dtoIn.regNum);
      if (!uuAircraft) {
        throw new Errors.Delete.AircraftGetByRegNumDaoFailed({ uuAppErrorMap }, { aircraft: uuAircraft.regNum });
      }
    }

    //HDS - 5 check activa state
    if (uuAircraft.state === "active") {
      throw new Errors.Delete.AircraftInActiveState({ uuAppErrorMap }, { state: uuAircraft.image });
    }

    //HDS 4 - delete image
    if (uuAircraft.image) {
      try {
        await this.aircraftImageDao.deleteByCode(awid, uuAircraft.image);
      } catch (e) {
        throw new Errors.Delete.UuBinaryDeleteFailed({ uuAppErrorMap }, e);
      }
    }

    //HDS - 6 delete aircraft
    let uuDeletedAircraft = null;
    uuDeletedAircraft = await this.aircraftDao.delete(awid, uuAircraft.id);

    if (uuDeletedAircraft) {
      throw new Errors.Delete.AircraftDaoDeleteFailed({ uuAppErrorMap }, { id: uuAircraft.id });
    }

    return {
      ...uuDeletedAircraft,
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
    let validationResult = this.validator.validate("aircraftGetDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //HDS -2 find a aircraft
    let uuAircraft = null;

    if (dtoIn.id) {
      uuAircraft = await this.aircraftDao.get(awid, dtoIn.id);
      if (!uuAircraft) {
        throw new Errors.Get.AircraftGetDaoFailed({ uuAppErrorMap }, { aircraft: dtoIn.id });
      }
    } else {
      uuAircraft = await this.aircraftDao.getByRegNumber(awid, dtoIn.regNum);
      if (!uuAircraft) {
        throw new Errors.Get.AircraftGetByRegNumDaoFailed({ uuAppErrorMap }, { aircraft: dtoIn.regNum });
      }
    }
    //HDS -3 return
    return { ...uuAircraft, uuAppErrorMap };
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
    let validationResult = this.validator.validate("aircraftCreateDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //HDS -  create image
    const uuObject = { ...dtoIn, awid };

    let AircraftImage;
    if (dtoIn.image) {
      try {
        AircraftImage = await this.aircraftImageDao.create({ awid }, uuObject.image);
      } catch (e) {
        if (e instanceof BinaryStoreError) {
          // A3
          throw new Errors.Create.AircraftImageDaoCreateFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
      uuObject.image = AircraftImage.code;
    }

    // HDS 3 - create via DAO
    let uuAircraft = null;

    uuObject.state = "active";

    try {
      uuAircraft = await this.aircraftDao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.AircraftDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 4 - return the
    return {
      ...uuAircraft,
      uuAppErrorMap,
    };
  }
}

module.exports = new AircraftAbl();
