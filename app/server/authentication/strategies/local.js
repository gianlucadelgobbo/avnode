var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var querystring = require('querystring');
var User = require('../../models/user');

module.exports = new LocalStrategy(function(username, password, done) {
  User.findOne({'login': username}, function(err, user) {
    if (err) {
      console.log('Error');
      console.log(err);
      return done(err, null);
    }
    if (!user) {
      console.log('User not found');
      return done(null, false, {message:"User not found"});
    }
    if (user.password) {
      console.log('compare');
      user.comparePassword(password, function(err, isMatch) {
        if (err || !isMatch) {
          console.log('Wrong password');
          return done(null, false, {message:"Wrong password"});
        } else {
          console.log('Login OK');
          return done(null, user);
        }
      });
    } else {
      console.log('Compare FLxER');
      tryFlxer(username, password, function(res) {
        console.log(res);
        if (res.login === true) {
          console.log('Login FLxER OK');
          // SAVE PASSWORD !!!
          return done(null, user);
        } else {
          console.log('Login FLxER FAILED');
          return done(null, false, {message:"Login Failed"});
        }
      });
    }
  });
});

var tryFlxer = function(username, password, cb) {
  // Try flxer
  request.post({
    uri: "https://flxer.net/api/login",
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    body: querystring.stringify({login:username, password:password})
  }, function(err, res, body){
    var response = JSON.parse(body);
    cb(response);
  });
};
