/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let expect = require('chai').expect;

let logEntriesAdapter = require('../../lib/streamFactories/logentries');

describe('LogEntries Adapter', function() {

	it('should return a valid LogEntries Stream', function() {
		let stream =
			logEntriesAdapter({
				level: 'info',
				token: '51e29649-31f1-46b6-9579-53391e76cf38'
			});

		expect(stream.level).to.equal('info');
		expect(stream.stream).to.be.a('Object');

	});

});
