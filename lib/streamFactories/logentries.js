/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let _ = require('lodash');
let LogEntries = require('bunyan-logentries');

module.exports = function(options) {

	let params = _.merge({
		token: process.env.LOGENTRIES_TOKEN
	}, options);

	if (!params.token) {
		throw new Error('Requested logentries stream, but no token specified');
	}

	return _.merge({
		type: 'raw',
		stream: LogEntries.createStream(params)}, params);

};
