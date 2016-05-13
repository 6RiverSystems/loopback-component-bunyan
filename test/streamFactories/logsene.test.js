/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let expect = require('chai').expect;

let logseneAdapter = require('../../lib/streamFactories/logsene');

describe('Logsene Adapter', function() {

	it('should return a valid Logsene Stream', function() {
		let stream =
			logseneAdapter({
				level: 'info',
				token: 'testToken'
			});

		expect(stream.level).to.equal('info');
		expect(stream.stream).to.be.a('Object');
		expect(stream.stream._client).to.be.a('Object');
		expect(stream.stream._client.token).to.equal('testToken');

	});

});
