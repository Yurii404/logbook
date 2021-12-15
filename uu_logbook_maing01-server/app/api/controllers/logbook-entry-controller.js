"use strict";
const LogbookEntryAbl = require("../../abl/logbook-entry-abl.js");

class LogbookEntryController {

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
