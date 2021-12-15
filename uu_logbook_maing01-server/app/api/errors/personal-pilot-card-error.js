"use strict";

const LogbookMainUseCaseError = require("./logbook-main-use-case-error.js");
const PERSONAL_PILOT_CARD_ERROR_PREFIX = `${LogbookMainUseCaseError.ERROR_PREFIX}personalPilotCard/`;

const Create = {
  UC_CODE: `${PERSONAL_PILOT_CARD_ERROR_PREFIX}create/`,

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
  PersonalPilotCardDaoCreateFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}personalPilotCardDaoCreateFailed`;
      this.message = "Personal Pilot Card Dao Create Failed.";
    }
  },

};

const Get = {
  UC_CODE: `${PERSONAL_PILOT_CARD_ERROR_PREFIX}get/`,


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
  PersonalPilotCardGetDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}personalPilotCardGetDaoFailed`;
      this.message = "Personal Pilot Card Get Dao Failed.";
    }
  },


};

const Delete = {
  UC_CODE: `${PERSONAL_PILOT_CARD_ERROR_PREFIX}delete/`,

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
  PersonalPilotCardGetDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}personalPilotCardGetDaoFailed`;
      this.message = "Personal Pilot Card Get Dao Failed.";
    }
  },
  PersonalPilotCardDaoDeleteFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}personalPilotCardDaoDeleteFailed`;
      this.message = "Personal Pilot Card Delete Dao Failed.";
    }
  },

};

module.exports = {
  Delete,
  Get,
  Create
};
