/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let _ = require('lodash');

module.exports = function(options) {
	return _.merge({
		type: 'file',
		logFile: options.logFile
	}, options);
};
