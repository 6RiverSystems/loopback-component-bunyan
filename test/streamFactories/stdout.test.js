'use strict';

const expect = require('chai').expect;

const stdoutAdapter = require('../../lib/streamFactories/stdout');

describe('Stdout Adapter', function() {

	it('should return a valid stdout Stream', function() {
		const stream =
			stdoutAdapter({
				level: 'info',
			});

		expect(stream.level).to.equal('info');
		expect(stream.stream).to.equal(process.stdout);
	});

});

