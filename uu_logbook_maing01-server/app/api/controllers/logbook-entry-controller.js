"use strict";
const LogbookEntryAbl = require("../../abl/logbook-entry-abl.js");

class LogbookEntryController {

  listByPilot(ucEnv) {
    return LogbookEntryAbl.listByPilot(ucEnv.getUri().getAwid(),ucEnv.getSession() ,ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return LogbookEntryAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return LogbookEntryAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return LogbookEntryAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return LogbookEntryAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return LogbookEntryAbl.create(ucEnv.getUri().getAwid(),ucEnv.getSession() ,ucEnv.getDtoIn());
  }

}

module.exports = new LogbookEntryController();
