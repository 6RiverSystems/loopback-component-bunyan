/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

const logentries = require('./logentries');
const prettystream = require('./prettystream');
const logdna = require('./logdna');
const file = require('./file');
const stdout = require('./stdout');

module.exports = {
	logdna,
	logentries,
	prettystream,
	file,
	stdout,
};
