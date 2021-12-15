"use strict";
const LogbookMainUseCaseError = require("./logbook-main-use-case-error.js");

const Init = {
  UC_CODE: `${LogbookMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateLogBookFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createLogBookFailed`;
      this.message = "Create logbook failed.";
    }
  },
};

module.exports = {
  Init,
};
