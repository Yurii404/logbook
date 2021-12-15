"use strict";
const AircraftAbl = require("../../abl/aircraft-abl.js");

class AircraftController {


  setState(ucEnv) {
    return AircraftAbl.setState(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  async getAircraftImage(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let dtoOut = await AircraftAbl.getAircraftImage(ucEnv.getUri().getAwid(), dtoIn);
    return ucEnv.setBinaryDtoOut(dtoOut, dtoIn.contentDisposition);
  }

  list(ucEnv) {
    return AircraftAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return AircraftAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return AircraftAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return AircraftAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new AircraftController();
