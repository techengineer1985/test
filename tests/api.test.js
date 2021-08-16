"use strict";

const request = require("supertest");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const app = require("../src/app")(db);
const buildSchemas = require("../src/schemas");

describe("API tests", () => {
	before(done => {
		db.serialize(err => {
			if (err) {
				return done(err);
			}
			buildSchemas(db);
			done();
		});
	});

	describe("GET /health", () => {
		it("should return health", done => {
			request(app)
				.get("/health")
				.expect(200, done);
		});
	});

	describe("GET /rides?limit=10&skip=20", () => {
		it("should return 10 rides of the 2nd page", done => {
			request(app)
				.get("/rides")
				.expect(200, done);
		});
	});

	describe("GET /rides/:id", () => {
		it("should return a ride by its id", done => {
			request(app)
				.get("/rides/W2892")
				.expect(200, done);
		});
	});

	describe("POST /rides", () => {
		it("should create a ride", done => {
			request(app)
				.post("/rides")
				.send({
					rider_name: "jack",
					driver_name: "sam",
					driver_vehicle: "A2618GS"
				})
				.expect(201, done);
		});
	});
});
