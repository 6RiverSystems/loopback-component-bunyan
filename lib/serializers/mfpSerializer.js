/**
 * Created by jpollak on 1/6/17.
 */
'use strict';

let _ = require('lodash');

function mfpSerializer(mfp) {

	return _.pick(mfp, ['id', 'state', 'hwReady', 'guiReady', 'userId', 'phase', 'totes']);
}

module.exports = mfpSerializer;
