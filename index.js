var BunyanComponent = require('./lib/component');

BunyanComponent.requestLogger = require('./lib/middleware/request-logger');
BunyanComponent.failureLogger = require('./lib/middleware/failure-logger');

module.exports = BunyanComponent;
