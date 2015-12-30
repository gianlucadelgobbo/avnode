var User = require('../../models/user');
var config = require('getconfig');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = new FacebookStrategy(config.socials.facebook_login,
	function(accessToken, refreshToken, profile, done) {
		User.findOne({'facebook.id': profile.id}, function(err, user) {
      // FIXME
      done(err, user);
    });
	}
);
