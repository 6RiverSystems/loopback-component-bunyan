'use strict';

const expect = require('chai').expect;

const fileAdapter = require('../../lib/streamFactories/file');

describe('File Adapter', function() {

	it('should return a valid Logsene Stream', function() {
		const logFile = '/var/log/test.log';

		const stream =
			fileAdapter({
				level: 'info',
				logFile: logFile
			});

		expect(stream.level).to.equal('info');
		expect(stream.type).to.equal('file');
		expect(stream).to.be.a('Object');
		expect(stream.logFile).to.equal(logFile);
	});

	it('should throw an exception', function() {
		expect(fileAdapter.bind({
			level: 'info'
		})).to.throw(Error);
	});

});
