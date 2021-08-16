const { errorHandler } = require("../lib");

class Base {
	constructor() {}

	/******************************
    // create({params}):
      inserts a row of data in the database
    //params:<db, command, data>
      db: is the database instance
      command: is the SQL query to be executed against the database
      data: is the new data record to be inserted into the database
  ******************************/

	static async create({ db, command, data }) {
		try {
			return await db.run(command, data);
		} catch (error) {
			throw new errorHandler(
				500,
				"SERVER_ERROR",
				`Error => create new...  ${error.message}`
			);
		}
	}

	/******************************
    // get({params}):
      retrieves selected rows from the database
    //params:<db, command>
      db: is the database instance
      command: is the SQL query to be executed against the database
  ******************************/

	static async get({ db, command, data = "" }) {
		try {
			return await db.all(command, data);
		} catch (e) {
			throw new errorHandler(
				500,
				"SERVER_ERROR",
				`Error => get... ${e.message}`
			);
		}
	}
}

module.exports = Base;
