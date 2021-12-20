"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AircraftMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, regNum: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async getByRegNumber(awid, regNum) {
    let filter = {
      awid,
      regNum,
    };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async listByAwid(awid, pageInfo = {}) {
    return super.find({ awid }, pageInfo);
  }

  async delete(awid, id) {
    let filter = {
      awid,
      id,
    };
    return await super.deleteOne(filter);
  }

  async setState(awid, id, uuObject) {
    let filter = {
      awid,
      id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
}

module.exports = AircraftMongo;
