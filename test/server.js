'use strict';

let loopback = require('loopback');

let app = loopback();
let PORT = 3031;

app.set('legacyExplorer', false);

app.start = function(done) {
	let listener = app.listen(PORT, function() {
		app.stop = function(cb) {
			listener.close(cb);
		};
		done();
	});
};

before(function(done) {
	app.start(done);
});

after(function(done) {
	app.stop(done);
});

module.exports = app;
