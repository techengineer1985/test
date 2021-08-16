const { RidesModel } = require("../models");
const { winLogger, handleApiSuccess, handleApiError } = require("../lib");

class Rides {
	constructor() {
		this.model = RidesModel;

		this.create = this.create.bind(this);
		this.get = this.get.bind(this);
		this.getById = this.getById.bind(this);
	}

	/********************************
    create a ride
  ********************************/
	create(db) {
		return async (req, res) => {
			try {
				const rows = await this.model.create({ req, db });
				handleApiSuccess(res, 201, "rides successfully created", { rows });
			} catch (error) {
				winLogger.error(
					`[method: "${req.method}"] [path: "${req.originalUrl ||
						""}"] [status code: ${error.statusCode}]  [error: "${
						error.message
					}"]`
				);
				handleApiError(res, error.statusCode, {
					error_code: error.code,
					error: error.message
				});
			}
		};
	}

	/********************************
    get rides
  ********************************/

	get(db) {
		return async (req, res) => {
			try {
				const rows = await this.model.get({ req, db });
				handleApiSuccess(res, 200, "rides successfully retrieved", { rows });
			} catch (error) {
				winLogger.error(
					`[method: "${req.method}"] [path: "${req.originalUrl ||
						""}"] [status code: ${error.statusCode}]  [error: "${
						error.message
					}"]`
				);
				handleApiError(res, error.statusCode, {
					error_code: error.code,
					error: error.message
				});
			}
		};
	}

	/********************************
    get a ride by its id
  ********************************/

	getById(db) {
		return async (req, res) => {
			try {
				const rows = await this.model.getById({ req, db });
				handleApiSuccess(
					res,
					200,
					`ride with the id ${req.params.id} successfully retrieved`,
					{ rows }
				);
			} catch (error) {
				winLogger.error(
					`[method: "${req.method}"] [path: "${req.originalUrl ||
						""}"] [status code: ${error.statusCode}]  [error: "${
						error.message
					}"]`
				);
				handleApiError(res, error.statusCode, {
					error_code: error.code,
					error: error.message
				});
			}
		};
	}
}

module.exports = Rides;
