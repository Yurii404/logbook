"use strict";

const LogbookMainUseCaseError = require("./logbook-main-use-case-error.js");
const AIRCRAFT_ERROR_PREFIX = `${LogbookMainUseCaseError.ERROR_PREFIX}aircraft/`;

const Create = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}create/`,

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
  AircraftImageDaoCreateFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}aircraftImageDaoCreateFailed`;
      this.message = "Aircraft Image Dao Create Failed";
    }
  },
  AircraftDaoCreateFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}aircraftDaoCreateFailed`;
      this.message = "Aircraft Dao Create Failed";
    }
  },
};

const Get = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}get/`,

  LogBookMainDoesNotExist: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logbookMainDoesNotExist`;
      this.message = "LogBook Main does not exist.";
    }
  },
  AircraftGetDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}aircraftGetByRegNumDAOFailed.`;
      this.message = "Aircraft getByRegNum DAO failed.";
    }
  },
  AircraftGetByRegNumDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}aircraftGetDAOFailed.`;
      this.message = "Aircraft get DAO failed.";
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
};

const Delete = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}delete/`,

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
  AircraftGetDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}aircraftGetByRegNumDAOFailed.`;
      this.message = "Aircraft getByRegNum DAO failed.";
    }
  },
  AircraftGetByRegNumDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}aircraftGetDAOFailed.`;
      this.message = "Aircraft get DAO failed.";
    }
  },
  UuBinaryDeleteFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}uuBinaryDeleteFailed.`;
      this.message = "Deleting uuBinary failed.";
    }
  },
  AircraftInActiveState: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}aircraftInActiveState.`;
      this.message = "Can not delete Active aircraft.";
    }
  },
  AircraftDaoDeleteFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}aircraftDaoDeleteFailed.`;
      this.message = "The system failed to delete the aircraft uuObject.";
    }
  },
};

const List = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}list/`,

  LogBookMainDoesNotExist: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}logbookMainDoesNotExist`;
      this.message = "LogBook Main does not exist.";
    }
  },

  LogBookMainIsNotInProperState: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}logbookMainIsNotInProperState`;
      this.message = "LogBook Main Is Not In Proper State.";
    }
  },

  InvalidDtoIn: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const GetAircraftImage = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}getAircraftImage/`,

  LogBookMainDoesNotExist: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetAircraftImage.UC_CODE}logbookMainDoesNotExist`;
      this.message = "LogBook Main does not exist.";
    }
  },

  LogBookMainIsNotInProperState: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetAircraftImage.UC_CODE}logbookMainIsNotInProperState`;
      this.message = "LogBook Main Is Not In Proper State.";
    }
  },

  InvalidDtoIn: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetAircraftImage.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AircraftImageDoesNotExist: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetAircraftImage.UC_CODE}aircraftImageDoesNotExist`;
      this.message = "Aircraft Image Does Not Exist.";
    }
  },
};

const SetState = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}setState/`,

  LogBookMainDoesNotExist: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}logbookMainDoesNotExist`;
      this.message = "LogBook Main does not exist.";
    }
  },

  LogBookMainIsNotInProperState: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}logbookMainIsNotInProperState`;
      this.message = "LogBook Main Is Not In Proper State.";
    }
  },

  InvalidDtoIn: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AircraftGetDaoFailed: class extends LogbookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}aircraftGetByRegNumDAOFailed.`;
      this.message = "Aircraft getByRegNum DAO failed.";
    }
  },
};

module.exports = {
  SetState,
  GetAircraftImage,
  List,
  Delete,
  Get,
  Create,
};
