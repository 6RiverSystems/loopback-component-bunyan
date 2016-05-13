/**
 * Created by jpollak on 5/13/16.
 */
'use strict';

let expect = require('chai').expect;

let prettyStreamAdapter = require('../../lib/streamFactories/prettystream');

describe('PrettyStream Adapter', function() {

	it('should return a valid PrettyStream', function() {
		let stream =
			prettyStreamAdapter({
				level: 'info'
			});

		expect(stream.level).to.equal('info');
		expect(stream.stream).to.be.a('Object');

	});

});
