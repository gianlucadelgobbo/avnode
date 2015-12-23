var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var querystring = require('querystring');
var User = require('../../models/user');

module.exports = new LocalStrategy(function(username, password, done) {
  User.findOne({'login': username}, function(err, user) {
    if (err) {
      return done(err, null);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }
    if (user) {
      console.log('compare');
      user.comparePassword(password, function(err, isMatch) {
        if (err || !isMatch) {
          //tryFlxer(username, password, function(err, isMatch) {
          //  console.log(err, isMatch);
          //});
          return done(null, false, { message: 'Incorrect password' });
          // try against flxer
        }
        return done(null, user);
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
    console.log(response);
  });
};
