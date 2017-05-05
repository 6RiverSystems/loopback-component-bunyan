'use strict';

let _ = require('lodash');
let bunyan = require('bunyan');
let streamFactories = require('./streamFactories');

module.exports = function(app, options) {

	options = options || {};

	// Set defaults
	options.name = options.name || 'log';

	options.serializers = _.assign(bunyan.stdSerializers, options.serializers);

	let defaultStream = {
		level: 'debug',
		type: 'stdout'
	};

	// Parses transports JSON array
	// Returns array of bunyan streamStub objects
	function parseStreams() {
		let streams = options.streams || [defaultStream];

		if (streams.constructor.name !== 'Array') {throw new Error('streamFactories should be Array');}
		if (streams.length === 0) {throw new Error('No streamFactory was specified');}

		return streams.map(function(streamOptions) {
			if (streamOptions.stream) {
				// Expects stream is already created, no parsing needed
				return streamOptions;
			} else {
				// Expects stream is POJO descriptor from components JSON file
				let streamType = streamOptions.type;

				if (!streamType) {
					throw new Error('type property is not specified for stream descriptor: ' +
						JSON.stringify(streamOptions));
				}

				let StreamAdapter = streamFactories[streamType];

				if (!StreamAdapter) {
					throw new Error(`unsupported stream type specified: ${streamType}`);
				}

				delete streamOptions.type;

				try {
					return new StreamAdapter(streamOptions);
				} catch(err) {
					console.error(err.message);
					return null;
				}
			}
		})
		.filter(val => !!val);
	}

	options.streams = parseStreams(options);

	app._log = bunyan.createLogger(options);
	app.logger = function(component) {
		return app._log.child({
			component
		});
	};
};

