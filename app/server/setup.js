GLOBAL._config = require('./config.js')._config;
var DB = require('./modules/db-manager.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var settings = require('./settings.js')._config;
var ObjectID = require('mongodb').ObjectID;

for (var key in settings) {
	GLOBAL._config[key] = settings[key];
}

GLOBAL.i18n = require('i18n');
i18n.configure({
	// setup some locales - other locales default to en silently
	locales:		_config.locales,
	defaultLocale: 	_config.defaultLocale,
	cookie:			"avnode",
	// where to register __() and __n() to, might be "global" if you know what you are doing
	register:		 global
});

//GLOBAL.i18n.configure({defaultLocale:"it"});

module.exports = function(app, exp) {
	app.configure(function(){
		app.use(i18n.init);
		app.set('views', app.root + '/app/server/views');
		app.set('view engine', 'jade');
		app.set('view options', { doctype : 'html', pretty : true });
		app.use(exp.bodyParser());
		app.use(exp.cookieParser());
		app.use(exp.session({ secret: 'avnode' }));
		app.use(exp.methodOverride());
		app.use(require('stylus').middleware({ src: app.root + '/app/public' }));
		app.use(exp.static(app.root + '/app/public'));
        app.use(exp.static(app.root + '/bower_components'));
        app.use('/warehouse', exp.static(app.root + '/warehouse'));
        app.use(passport.initialize());
        app.use(passport.session());
    });
    passport.serializeUser(function(user, done) {
        console.log("serializeUser");
        console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        console.log(user);
        DB.users.findOne({_id:new ObjectID(user._id)}, function(err, user){
            //console.log(user);
            console.log("deserializeUser");
            if(!err) done(null, user);
            else done(err, null);
        });
    });


    passport.use(new LocalStrategy({
            usernameField: 'login'
        },
        function(username, password, done) {
            DB.validateFormLogin(username, password, function(e, o) {
                if (e && e.length) {
                    return done(null, false, { message: e.m });
                } else {
                    return done(null, o);
                }
            });
        }
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
            console.log(profile)
            DB.twitterFind(profile, function(err, res) {
                done(null, res);
            });
        }
    ));
    passport.use('google-login', new GoogleStrategy(_config.socials.google_login,
        function(accessToken, refreshToken, profile, done) {
            //profile.id = identifier;
            DB.googleFind(profile, function(err, res) {
                done(null, res);
            });
        }
    ));
    passport.use('google-signup', new GoogleStrategy(_config.socials.google_signup,
        function(accessToken, refreshToken, profile, done) {
            //profile.id = identifier;
            DB.googleFindOrCreate(profile, function(err, res) {
                done(null, res);
            });
        }
    ));
}
