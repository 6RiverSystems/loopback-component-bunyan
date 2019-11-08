'use strict';

let _ = require('lodash');

module.exports = function(options) {
	options = options || {};

	let level = options.level || 'info';
	let msg = options.msg || '${res.statusCode} ${req.method} ${res.time}ms ${req.decodedUrl}';
	let meta = options.meta;

	// Using mustache style templating
	let msgTemplate = _.template(msg, null, {
		interpolate: /\{\{(.+?)\}\}/g
	});

	function responseTimeMillisec(start) {
		let diff = process.hrtime(start);
		let ms = diff[0] * 1e3 + diff[1] * 1e-6;

		return  parseFloat(ms).toFixed(2);
	}

	function responseBody(chunk, headers, log) {
		let isJSON =
			headers &&
			headers['content-type'] &&
			headers['content-type'].indexOf('json') >= 0;

		let responseBody = '';
		try {
		    responseBody = isJSON ? JSON.parse(chunk) : chunk.toString();
		} catch (error) {
		    log.error(error, 'Failed to parse chunk.');
		}
		return responseBody;
	}

	return function(req, res, next) {
		let log = req.app.logger('request');

		let start = process.hrtime();

		if (meta) {
			// Building response body
			// Overriding res.end method
			let end = res.end;

			res.end = function(chunk, encoding) {
				res.end = end;
				res.end(chunk, encoding);
				// Getting response body
				res.body = chunk ? responseBody(chunk, res._headers, log) : chunk;
			};
		}

		// On finish, profile response time and log
		res.once('finish', function() {
			// Calculating response time
			res.time = responseTimeMillisec(start);

			// Fixing URL property
			req.url = req.originalUrl || req.url;
			req.decodedUrl = decodeURIComponent(req.url);

			let msg = msgTemplate({req: req, res: res});

			if (meta) {
				log.info({req, res}, msg);
			} else {
				log.info(msg);
			}
		});

		next();
	};
};
