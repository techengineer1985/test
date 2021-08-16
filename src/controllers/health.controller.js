const { winLogger, handleApiSuccess, handleApiError } = require("../lib");

class Health {
	constructor() {
		this.get = this.get.bind(this);
	}

	/********************************
    get health
  ********************************/
	get(db) {
		return async (req, res) => {
			try {
				handleApiSuccess(res, 200, "health' data retrieved successfully", {
					status: "Healthy"
				});
			} catch (error) {
				winLogger.error(
					`[method: "${req.method}"] [path: "${req.originalUrl ||
						""}"] [status code: 500]  [error: "${error.message}"]`
				);
				handleApiError(res, 500, { error: error.message });
			}
		};
	}
}

module.exports = Health;
