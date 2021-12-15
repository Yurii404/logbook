"use strict";

const LogbookMainUseCaseError = require("./logbook-main-use-case-error.js");
const LOGBOOK_ENTRY_ERROR_PREFIX = `${LogbookMainUseCaseError.ERROR_PREFIX}logbookEntry/`;

const Create = {
  UC_CODE: `${LOGBOOK_ENTRY_ERROR_PREFIX}create/`,

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
  ArrivalDateIsNotCorrect: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}arrivalDateIsNotCorrect`;
      this.message = "Arrival date cannot be the same or earlier than departure date!";
    }
  },
  ArrivalPlaceIsNotCorrect: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}arrivalPlaceIsNotCorrect`;
      this.message = "Arrival place cannot be the same than departure place!";
    }
  },
  LogBookEntryDaoCreateFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}logBookEntryDaoCreateFailed`;
      this.message = "Create logBookEntry by logBookEntry DAO create failed.";
    }
  },

};

const Get = {
  UC_CODE: `${LOGBOOK_ENTRY_ERROR_PREFIX}get/`,

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

  RecordInLogBookgetDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}recordInLogBookgetDaoFailed`;
      this.message = "RecordInLogBook get DAO failed.";
    }
  },


};

const Delete = {
  UC_CODE: `${LOGBOOK_ENTRY_ERROR_PREFIX}delete/`,

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

  RecordInLogBookgetDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}recordInLogBookgetDaoFailed`;
      this.message = "RecordInLogBook get DAO failed.";
    }
  },
  LogbookEntryDaoDeleteFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}logbookEntryDaoDeleteFailed`;
      this.message = "RecordInLogBook delete DAO failed.";
    }
  },


};

module.exports = {
  Delete,
  Get,
  Create
};
