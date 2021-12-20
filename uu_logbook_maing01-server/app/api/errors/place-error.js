"use strict";

const LogbookMainUseCaseError = require("./logbook-main-use-case-error.js");
const PLACE_ERROR_PREFIX = `${LogbookMainUseCaseError.ERROR_PREFIX}place/`;

const Create = {
  UC_CODE: `${PLACE_ERROR_PREFIX}create/`,

  LogBookMainDoesNotExist: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}logbookMainDoesNotExist`;
      this.message = "LogBook Main does not exist.";
    }
  },

  LogBookMainIsNotInProperState: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}logbookMainIsNotInProperState`;
      this.message = "LogBook Main Is Not In Proper State.";
    }
  },

  InvalidDtoIn: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PlaceDaoCreateFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}placeDaoCreateFailed`;
      this.message = "Place Dao Create Failed";
    }
  },
};

const Get = {
  UC_CODE: `${PLACE_ERROR_PREFIX}get/`,

  LogBookMainDoesNotExist: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logbookMainDoesNotExist`;
      this.message = "LogBook Main does not exist.";
    }
  },

  LogBookMainIsNotInProperState: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logbookMainIsNotInProperState`;
      this.message = "LogBook Main Is Not In Proper State.";
    }
  },

  InvalidDtoIn: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PlaceGetDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}placeGetByRegNumDAOFailed.`;
      this.message = "Place getByRegNum DAO failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${PLACE_ERROR_PREFIX}delete/`,

  LogBookMainDoesNotExist: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}logbookMainDoesNotExist`;
      this.message = "LogBook Main does not exist.";
    }
  },

  LogBookMainIsNotInProperState: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}logbookMainIsNotInProperState`;
      this.message = "LogBook Main Is Not In Proper State.";
    }
  },

  InvalidDtoIn: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PlaceGetDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}placeGetByRegNumDAOFailed.`;
      this.message = "Place get DAO failed.";
    }
  },
  PlaceDaoDeleteFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}placeDaoDeleteFailed.`;
      this.message = "The system failed to delete the place uuObject.";
    }
  },
};

const List = {
  UC_CODE: `${PLACE_ERROR_PREFIX}list/`,

  LogBookMainDoesNotExist: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}logbookMainDoesNotExist`;
      this.message = "LogBook Main does not exist.";
    }
  },

  LogBookMainIsNotInProperState: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}logbookMainIsNotInProperState`;
      this.message = "LogBook Main Is Not In Proper State.";
    }
  },

  InvalidDtoIn: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Delete,
  Get,
  Create,
};
