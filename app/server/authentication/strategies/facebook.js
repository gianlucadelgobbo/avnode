var User = require('../../models/user');
var config = require('getconfig');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports.login = new FacebookStrategy(config.socials.facebook_login,
	function(accessToken, refreshToken, profile, done) {
		User.findOne({'facebook.id': profile.id}, done);
	}
);

module.exports.signup = new FacebookStrategy(config.socials.facebook_signup, function(accessToken, refreshToken, profile, done) {
		User.findOne({'facebook.id': profile.id}, function(err, user) {
			// If we get no user/error, create a User from the profile
		});
});
