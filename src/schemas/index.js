"use strict";

module.exports = db => {
  const createRideTableSchema = require("./rides.schema");
  db.run(createRideTableSchema);

  return db;
};
