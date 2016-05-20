'use strict';

let app = {};
let bunyan = require('bunyan');
let assert = require('chai').assert;
let should = require('chai').should();
let spy = require('sinon').spy;
let stub = require('sinon').stub;

let prettyStreamAdapter = require('../lib/streamFactories/prettystream');

let component = require('../index');


describe('loopback-component-bunyan', function() {

	it('should not throw if streamFactories is not specified', function() {
		(function() {
			component(app, {});
		}).should.not.throw(Error);
	});

	it('should throw if streamFactories specified as something other than Array', function() {
		(function() {
			component(app, {
				streams: {}
			});
		}).should.throw('streamFactories should be Array');
	});

	it('should throw if streamFactories specified as empty array', function() {
		(function() {
			component(app, {
				streams: []
			});
		}).should.throw('No streamFactory was specified');
	});

	it('should throw if stream type is not specified', function() {
		(function() {
			component(app, {
				streams: [{level: 'info'}]
			});
		}).should.throw('type property is not specified for stream descriptor: {"level":"info"}');
	});

	it('should throw if unknown stream type is specified', function() {
		(function() {
			component(app, {
				streams: [{type: 'Unknownstream'}]
			});
		}).should.throw('unsupported stream type specified: Unknownstream');
	});

	it('should setup app._log property', function() {
		delete app._log;
		should.not.exist(app._log);
		component(app, {
			streams: [
				{type: 'prettystream'},
				{type: 'logsene', token: 'testToken'}
			]
		});
		should.exist(app._log);
		assert.equal(app._log.streams.length, 2);
	});


	it('should not fail with a bad stream config', function() {
		delete app._log;
		should.not.exist(app._log);
		component(app, {
			streams: [
				{type: 'prettystream'},
				{type: 'logsene'}
			]
		});
		should.exist(app._log);
		assert.equal(app._log.streams.length, 1);
	});

	it('should not throw for a manually constructed stream', function() {
		(function() {
			component(app, {
				streams: [
					prettyStreamAdapter()
				]
			});
		}).should.not.throw();
	});

});
