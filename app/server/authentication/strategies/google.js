var User = require('../../models/user');
var config = require('getconfig');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports.login = new GoogleStrategy(config.socials.google_login,
	function(accessToken, refreshToken, profile, done) {
		User.findOne({'google.id': profile.id}, done);
	}
);

module.exports.signup = new GoogleStrategy(config.socials.google_signup,
	function(accessToken, refreshToken, profile, done) {
		// FIXME
		/*
		DB.googleFindOrCreate(profile, function(err, res) {
			done(null, res);
		});
		*/
	}
);
