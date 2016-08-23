/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let _ = require('lodash');

let LogDNAStream = require('logdna').BunyanStream;

module.exports = function(options) {

	let params = _.merge({
		key: process.env.LOGDNA_TOKEN
	}, options);

	if (!params.key) {
		throw new Error('Requested logdna stream, but no token specified');
	}

	return _.merge({
		type: 'raw',
		stream: new LogDNAStream(params)
	}, params);
};
