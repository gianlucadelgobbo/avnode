var request = require('supertest');

module.exports = function(app) {
  describe('Server', function() {
    it('index page loads', function(done) {
      request(app)
      .get('/')
      .expect('content-type', /html/)
      .expect(200, done);
    });

    /*
    it('jabberwocky page does not load', function(done) {
      request(app)
      .get('/jabberwocky')
      .expect('content-type', /html/)
      .expect(500, done);
    });
    */
  });
};
