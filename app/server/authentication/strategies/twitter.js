var User = require('../../models/user');
var config = require('getconfig');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = new TwitterStrategy(config.socials.twitter_login,
	function(token, tokenSecret, profile, done) {
		User.findOne({'twitter.id': profile.id}, function(err, user) {
      // FIXME
      done(err, user);
    });
	}
);
