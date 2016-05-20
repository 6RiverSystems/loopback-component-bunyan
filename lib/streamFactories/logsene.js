/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let _ = require('lodash');
let Logsene = require('bunyan-logsene');

module.exports = function(options) {

	let params = _.merge({
		token: process.env.LOGSENE_TOKEN
	}, options);

	if (!params.token) {
		throw new Error('Requested logsene stream, but no token specified');
	}

	return _.merge({
		type: 'raw',
		stream: new Logsene(params)}, params);
};
