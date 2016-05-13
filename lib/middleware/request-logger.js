var _ = require('lodash');

module.exports = function(options) {
	options = options || {};

	var level = options.level || 'info';
	var msg = options.msg || '${res.statusCode} ${req.method} ${res.time}ms ${req.decodedUrl}';
	var meta = options.meta;

	// Using mustache style templating
	var msgTemplate = _.template(msg, null, {
		interpolate: /\{\{(.+?)\}\}/g
	});

	function responseTimeMillisec(start) {
		var diff = process.hrtime(start);
		var ms = diff[0] * 1e3 + diff[1] * 1e-6;

		return  parseFloat(ms).toFixed(2);
	}

	function responseBody(chunk, headers) {
		var isJSON =
			headers &&
			headers['content-type'] &&
			headers['content-type'].indexOf('json') >= 0;

		return isJSON ? JSON.parse(chunk) : chunk.toString();
	}

	return function(req, res, next) {
		var log = req.app.logger('request');

		var start = process.hrtime();

		if (meta) {
			// Building response body
			// Overriding res.end method
			var end = res.end;

			res.end = function(chunk, encoding) {
				res.end = end;
				res.end(chunk, encoding);
				// Getting response body
				res.body = responseBody(chunk, res._headers);
			};
		}

		// On finish, profile response time and log
		res.once('finish', function() {
			// Calculating response time
			res.time = responseTimeMillisec(start);

			// Fixing URL property
			req.url = req.originalUrl || req.url;
			req.decodedUrl = decodeURIComponent(req.url);

			var msg = msgTemplate({req: req, res: res});

			if (meta) {
				log.info({req, res}, msg);
			} else {
				log.info(msg);
			}
		});

		next();
	};
};
