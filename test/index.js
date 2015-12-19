var init = require('../init');
var routesIndexTest = require('./routes-index-test');
var routesApiTest = require('./routes-api-test');

var app = null;
var server = null;

init(function(a, s) {
	app = a;
	server = s;

	describe('Tests', function() {
		console.log('Running tests…');
		routesIndexTest(app);
		routesApiTest(app);
	});

	run();
});

after(function(done) {
	console.log('Cleaning up…');
	app._mongoose.disconnect(function() {
		server.close();
		done();
	});
});
