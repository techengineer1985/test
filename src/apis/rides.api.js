const api = require("express").Router();

const { RidesController } = require("../controllers");

const { create, get, getById } = new RidesController();

module.exports = db => {
	api.post("/", create(db));
	api.get("/", get(db));
	api.get("/:id", getById(db));
	return api;
};
