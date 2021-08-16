const api = require("express").Router();

const { HealthController } = require("../controllers");

const { get } = new HealthController();

module.exports = db => {
  api.get("/", get(db));
  return api;
};
