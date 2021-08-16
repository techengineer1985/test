const handlers = require("./handlers");
const loggers = require("./loggers");

module.exports = { ...loggers, ...handlers };
