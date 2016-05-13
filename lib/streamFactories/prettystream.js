/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let _ = require('lodash');
let PrettyStream = require('bunyan-prettystream');

module.exports = function(options) {
	let prettyStream = new PrettyStream();

	prettyStream.pipe(process.stdout);

	return _.merge(options, {stream: prettyStream});
};
