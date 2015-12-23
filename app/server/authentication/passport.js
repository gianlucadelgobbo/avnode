var passport = require('passport')
var local = require('./strategies/local');

var User = require('../models/user');

module.exports = function(app) {
  passport.use(local);

  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user.id);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser');
    console.log('deserializeUser', id);
    User.findById(id, function(err, user) {
      console.log('error', err);
      done(null, user);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
}
