/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let _ = require('lodash');
let LogEntries = require('bunyan-logentries');

module.exports = function(options) {

	return _.merge(options, {
		type: 'raw',
		stream: LogEntries.createStream({token: options.token || process.env.LOGENTRIES_TOKEN})
	});
};
