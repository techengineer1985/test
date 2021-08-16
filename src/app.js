"use strict";

const app = require("express")();
const helmet = require("helmet");
const onFinished = require("on-finished");
const bodyParser = require("body-parser");
const sqlinjection = require("sql-injection");

const { ridesAPI, healthAPI } = require("./apis");
const { winLogger } = require("./lib");

module.exports = db => {
	/********************************
  	app-level middleware
	********************************/

	// general security with helmet
	app.use(helmet());

	/**************
		security against sql injection
		// another good solution is the use of ORMs like sequalize or any other secure solution where vulnurability is lower compared to writing raw sql queries
	**************/
	// app.use(sqlinjection);

	// parsing json
	app.use(bodyParser.json());
	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);

	// app-level logger for all the incoming requests
	app.use((req, res, next) => {
		const { url, method, body, params, query, httpVersion, rawHeaders } = req;
		winLogger.httpREQ(`REQ: ${method} "${rawHeaders[1]}${url}"  ${body || ""}`);
		next();
		onFinished(req, (req, err) => {
			winLogger.httpRES(
				`RES: ${method} "${rawHeaders[1]}${url}" ${res.statusCode} ${
					res.statusMessage
				} ${res.body ? res.body : ""}\n`
			);
		});
	});

	/********************************
  	app APIs
	********************************/

	app.use("/health", healthAPI(db));
	app.use("/rides", ridesAPI(db));

	/********************************
  	others endpoints interceptor
	********************************/

	return app;
};
