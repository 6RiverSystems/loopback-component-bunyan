/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let expect = require('chai').expect;

let fileAdapter = require('../../lib/streamFactories/file');

describe('File Adapter', function() {

	it('should return a valid Logsene Stream', function() {
		const logFile = '/var/log/test.log';

		let stream =
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
