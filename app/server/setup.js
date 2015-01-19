var DB = require('./modules/db-manager.js');
var passport = require('passport');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var settings = require('./settings.js')._config;
var ObjectID = require('mongodb').ObjectID;
var multer  = require('multer');

for (var key in settings) {
	GLOBAL._config[key] = settings[key];
}
GLOBAL.i18n = require('i18n');
i18n.configure({
	locales:		_config.locales,
	defaultLocale: 	_config.defaultLocale,
	cookie:			"avnode",
	register:		 global
});

module.exports = function(app, exp) {
	//app.use(logger('combined'));
	app.use(i18n.init);
    app.set('port', _config.port);
	app.set('views', './app/server/views');
	app.set('view engine', 'jade');
	app.set('view options', { doctype : 'html', layout: './app/server/views/layout.jade', pretty : true });
	app.use(cookieParser());
	app.use(bodyParser.json({limit: _config.maxFileSize}));
	app.use(bodyParser.urlencoded({parameterLimit: 30000000000, limit: _config.maxFileSize, extended: true }));
	app.use(methodOverride());
	app.use(multer({ dest: _config.uploadedFilesPath}))

	app.use(session({ secret: 'avnode', resave: true, saveUninitialized: true }));
	app.use(require('stylus').middleware({ src: './app/public' }));
	app.use(exp.static('./app/public'));
	app.use(exp.static('./bower_components'));
	app.use('/warehouse', exp.static('./warehouse'));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

    passport.serializeUser(function(user, done) {
		console.log("serializeUser");
		console.log(user);
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        DB.users.findOne({_id:new ObjectID(user._id)}, function(err, user){
			if(!err) done(null, user);
			else done(err, null);
        });
    });
    passport.use(new LocalStrategy(function(username, password, done) {
		DB.validateFormLogin(username, password, function(e, o) {
			if (e && e.length) {
				return done(null, false, { message: e[0].m });
			} else {
				return done(null, o);
			}
		});}
    ));
    passport.use('facebook-login', new FacebookStrategy(_config.socials.facebook_login,
        function(accessToken, refreshToken, profile, done) {
            DB.facebookFind(profile, function(err, res) {
                done(null, res);
            });
        }
    ));
    passport.use('facebook-signup', new FacebookStrategy(_config.socials.facebook_signup,
        function(accessToken, refreshToken, profile, done) {
            DB.facebookFindOrCreate(profile, function(err, res) {
                done(null, res);
            });
        }
    ));
    passport.use('twitter-login', new TwitterStrategy(_config.socials.twitter_login,
        function(token, tokenSecret, profile, done) {
            DB.twitterFind(profile, function(err, res) {
                done(null, res);
            });
        }
    ));
    passport.use('google-login', new GoogleStrategy(_config.socials.google_login,
        function(accessToken, refreshToken, profile, done) {
            DB.googleFind(profile, function(err, res) {
                done(null, res);
            });
        }
    ));
    passport.use('google-signup', new GoogleStrategy(_config.socials.google_signup,
        function(accessToken, refreshToken, profile, done) {
            DB.googleFindOrCreate(profile, function(err, res) {
                done(null, res);
            });
        }
    ));
}