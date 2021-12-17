"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LogbookEntryMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
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

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(awid, id) {
    let filter = {
      awid,
      id,
    };
    return await super.deleteOne(filter);
  }

  async list( uuObject) {
    let filter = {
    };
    let mysort = null;

    if (uuObject.sortBy === "departureDate") {
      if (uuObject.order === "asc") {
        mysort = { departureDate: 1 };
      } else {
        mysort = { departureDate: -1 };
      }
    }
    if (uuObject.sortBy === "regNum") {
      if (uuObject.order === "asc") {
        mysort = { regNum: 1 };
      } else {
        mysort = { regNum: -1 };
      }
    }

    if (uuObject.sortBy){
      return super.find(filter, uuObject.pageInfo, mysort);
    }else {
      return super.find(filter, uuObject.pageInfo);
    }


  }

  async listByPilot(uuObject) {
    let filter = {
      uuIdentity: uuObject.uuIdentity
    };
    let mysort = null;

    if (uuObject.sortBy === "departureDate") {
      if (uuObject.order === "asc") {
        mysort = { departureDate: 1 };
      } else {
        mysort = { departureDate: -1 };
      }
    }
    if (uuObject.sortBy === "regNum") {
      if (uuObject.order === "asc") {
        mysort = { regNum: 1 };
      } else {
        mysort = { regNum: -1 };
      }
    }

    if (uuObject.sortBy){
      return super.find(filter, uuObject.pageInfo, mysort);
    }else {
      return super.find(filter, uuObject.pageInfo);
    }
  }

}

module.exports = LogbookEntryMongo;
