var passport = require('passport');
var User = require('../models/user');
var localAuthentication = require('./strategies/local');
var facebookAuthentication = require('./strategies/facebook');
var twitterAuthentication = require('./strategies/twitter');
var googleAuthentication = require('./strategies/google');

module.exports = function(app) {
	passport.use(localAuthentication);
	passport.use('facebook-login', facebookAuthentication.login);
	passport.use('facebook-signup', facebookAuthentication.signup);
	passport.use('twitter-login', twitterAuthentication.login);
	passport.use('google-login', googleAuthentication.login);
	passport.use('google-signup', googleAuthentication.signup);

	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(user, done) {
		User.findOne({_id: user._id}, done);
	});

	app.use(passport.initialize());
	app.use(passport.session());
};

