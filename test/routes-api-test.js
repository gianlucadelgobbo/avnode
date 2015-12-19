var request = require('supertest');

module.exports = function(app) {
	describe('API', function() {
		it('/api/clients redirects if not logged in', function(done) {
			request(app)
			.get('/api/clients')
			.expect('content-type', /text/)
			.expect(302, done);
		});

		/*
		it('/api/clients returns clients', function(done) {
			request(app)
			.get('/api/clients')
			.expect('content-type', /text/)
			.expect(302, done);
		});
		*/
	});
};
