"use strict";

try {
	const sqlite3 = require("sqlite3").verbose();
	const db = new sqlite3.Database(":memory:");
	const buildSchemas = require("./src/schemas");
	const { winLogger } = require("./src/lib");

	const port = process.env.PORT || 8010;

	db.serialize(async () => {
		try {
			await buildSchemas(db);
			const app = require("./src/app")(db);

			app.listen(port, () => {
				winLogger.info(`App started and is listening on port ${port}`);
				console.log(`App started and is listening on port ${port}`);
			});
		} catch (error) {
			winLogger.error(`[ error: "${error.message}" ]`);
		}
	});
} catch (error) {
	winLogger.error(`[ error: "${error.message}" ]`);
}
