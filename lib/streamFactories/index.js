/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

const logentries = require('./logentries');
const logsene = require('./logsene');
const prettystream = require('./prettystream');
const logdna = require('./logdna');
const file = require('./file');
const stdout = require('./stdout');

module.exports = {
	logdna,
	logsene,
	logentries,
	prettystream,
	file,
	stdout,
};
