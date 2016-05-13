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

	return _.merge({stream: new Logsene(params)}, params);
};
