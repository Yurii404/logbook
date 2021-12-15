"use strict";
const LogbookMainAbl = require("../../abl/logbook-main-abl.js");

class LogbookMainController {
  init(ucEnv) {
    return LogbookMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new LogbookMainController();
