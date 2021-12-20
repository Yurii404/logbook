"use strict";
const PersonalPilotCardAbl = require("../../abl/personal-pilot-card-abl.js");

class PersonalPilotCardController {
  delete(ucEnv) {
    return PersonalPilotCardAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return PersonalPilotCardAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return PersonalPilotCardAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new PersonalPilotCardController();
