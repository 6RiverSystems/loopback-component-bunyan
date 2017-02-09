'use strict';

let _ = require('lodash');

module.exports = function(options) {
	return _.merge({
		type: 'file',
		logFile: options.logFile
	}, options);
};
