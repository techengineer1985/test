const BaseModel = require("./base.model");
const { errorHandler } = require("../lib");

class Rides extends BaseModel {
	constructor() {}

	/******************************
		// create({params}):
			creates a new ride record after validating the data recieved on the body of the request object
		//params:<req, db>
			req: is the request object
			db: is the database instance
	******************************/
	static async create({ req, db }) {
		try {
			/********************************
        // NOTE:
          'All this tedious validation code could be avoided and cleaned by using a validation middleware like one "express-validator" library provies among many other libraries.'
      ********************************/

			const startLatitude = Number(req.body.start_lat);
			const startLongitude = Number(req.body.start_long);
			const endLatitude = Number(req.body.end_lat);
			const endLongitude = Number(req.body.end_long);
			const riderName = req.body.rider_name;
			const driverName = req.body.driver_name;
			const driverVehicle = req.body.driver_vehicle;

			if (
				startLatitude < -90 ||
				startLatitude > 90 ||
				startLongitude < -180 ||
				startLongitude > 180
			)
				throw new errorHandler(
					400,
					"VALIDATION_ERROR",
					`Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively`
				);

			if (
				endLatitude < -90 ||
				endLatitude > 90 ||
				endLongitude < -180 ||
				endLongitude > 180
			)
				throw new errorHandler(
					400,
					"VALIDATION_ERROR",
					`End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively`
				);

			if (typeof riderName !== "string" || riderName.length < 1)
				throw new errorHandler(
					400,
					"VALIDATION_ERROR",
					`Rider name must be a non empty string`
				);

			if (typeof driverName !== "string" || driverName.length < 1)
				throw new errorHandler(
					400,
					"VALIDATION_ERROR",
					`Driver name must be a non empty string`
				);

			if (typeof driverVehicle !== "string" || driverVehicle.length < 1)
				throw new errorHandler(
					400,
					"VALIDATION_ERROR",
					`Driver's vehicle must be a non empty string`
				);

			var data = [
				req.body.start_lat,
				req.body.start_long,
				req.body.end_lat,
				req.body.end_long,
				req.body.rider_name,
				req.body.driver_name,
				req.body.driver_vehicle
			];

			const command = `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)`;
			const result = await super.create({ db, command, data });
			const command2 = `SELECT * FROM Rides WHERE rideID = ?`;
			const data2 = result.ID;
			const rows = await super.get({ db, command: command2, data: data2 });
			if (rows.length === 0)
				throw new errorHandler(
					500,
					"RIDES_NOT_FOUND_ERROR",
					`CREATE rides error: No rides created/returned`
				);

			return rows;
		} catch (error) {
			throw new errorHandler(error.statusCode, error.code, error.message);
		}
	}

	/******************************
		// get({params}):
			retrieves records of rides from the database based on the criteria specified in the query parameters
		//params:<req, db>
			req: is the request object
			db: is the database instance
	******************************/

	static async get({ req, db }) {
		try {
			const {
				query: { limit = 10, skip = 0 }
			} = req;

			// preventing against sql-injection
			// verify limit and skip
			if (
				!Number.isInteger(parseInt(limit)) ||
				!Number.isInteger(parseInt(skip))
			) {
				throw new errorHandler(
					400,
					"PARAMS_ERROR",
					`use integers only for pagination`
				);
			}

			const command = `
        SELECT * FROM Rides
        ${
					req.query && limit && skip
						? `OFFSET ${parseInt(skip)} ROWS
              FETCH NEXT ${parseInt(limit)} ROWS ONLY`
						: ""
				}

      `;

			const rows = await super.get({ db, command });

			if (rows.length === 0)
				throw new errorHandler(
					404,
					"RIDES_NOT_FOUND_ERROR",
					`GET rides error: No rides found`
				);

			return rows;
		} catch (error) {
			throw new errorHandler(error.statusCode, error.code, error.message);
		}
	}

	/******************************
		// getById({params}):
			retrieves a single record of rides table  based on the id specified in the request parameters
		//params:<req, db>
			req: is the request object
			db: is the database instance
	******************************/

	static async getById({ req, db }) {
		try {
			const command = `SELECT * FROM Rides WHERE rideID='${req.params.id}'`;
			const rows = await super.get({ db, command });
			if (rows.length === 0)
				throw new errorHandler(
					404,
					"RIDES_NOT_FOUND_ERROR",
					`GET rides error: No rides found`
				);

			return rows;
		} catch (error) {
			throw new errorHandler(error.statusCode, error.code, error.message);
		}
	}
}

module.exports = Rides;
