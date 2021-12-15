"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/logbook-main-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
  },
};

const logger = LoggerFactory.get("LogbookMainAbl");

class LogbookMainAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("logbookMain");
  }

  async init(uri, dtoIn, session, uuAppErrorMap ={}) {
      const awid = uri.getAwid();
      // HDS 1
      let validationResult = this.validator.validate("logBookInitDtoInType", dtoIn);
      // A1, A2
      uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        WARNINGS.initUnsupportedKeys.code,
        Errors.Init.InvalidDtoIn
      );

      // HDS 2
      const schemas = ["logbookMain", "place", "aircraft", "personalPilotCard", "logbookEntry"];
      let schemaCreateResults = schemas.map(async (schema) => {
        try {
          return await DaoFactory.getDao(schema).createSchema();
        } catch (e) {
          // A3
          throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
        }
      });
      await Promise.all(schemaCreateResults);



    // HDS 3
    const { uuAppProfileAuthorities, ...restDtoIn } = dtoIn;

    if (dtoIn.uuAppProfileOperators) {
      try {
        await Profile.set(awid, "Operators", dtoIn.uuAppProfileOperators);
      } catch (e) {
        if (e instanceof UuAppWorkspaceError) {
          // A4
          throw new Errors.Init.sysUuAppWorkspaceProfileSetFailed(
            { uuAppErrorMap },
            { role: dtoIn.uuAppProfileOperators },
            e
          );
        }
        throw e;
      }
    }

      // HDS 4 - HDS N


      if (!restDtoIn.state){
        restDtoIn.state = "underConstruction"
      }
    if (!restDtoIn.name){
      restDtoIn.name = "uuLogBook"
    }

      const uuObject = {
        awid,
        ...restDtoIn,
      };

      let uuLogBookInstance = null;

      try {
        uuLogBookInstance = this.dao.create(uuObject);
      } catch (e) {
        throw new Errors.Init.CreateLogBookFailed({ uuAppErrorMap }, e);
      }

      return {
        ...uuLogBookInstance,
        uuAppErrorMap: uuAppErrorMap,
      };
  }
}

module.exports = new LogbookMainAbl();
