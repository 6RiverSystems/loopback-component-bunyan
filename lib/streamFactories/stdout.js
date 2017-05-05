'use strict';

let _ = require('lodash');

module.exports = function(options) {
	return _.merge(options, {stream: process.stdout});
};
