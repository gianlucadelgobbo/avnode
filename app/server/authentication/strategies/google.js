var User = require('../../models/user');
var config = require('getconfig');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = new GoogleStrategy(config.socials.google_login,
	function(accessToken, refreshToken, profile, done) {
		User.findOne({'google.id': profile.id}, function(err, user) {
      // FIXME
      done(err, user);
    });
	}
);
