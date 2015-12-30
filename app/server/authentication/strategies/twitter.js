var User = require('../../models/user');
var config = require('getconfig');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports.login = new TwitterStrategy(config.socials.twitter_login,
	function(token, tokenSecret, profile, done) {
		User.findOne({'twitter.id': profile.id}, done);
	}
);
