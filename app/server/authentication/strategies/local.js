var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var querystring = require('querystring');
var User = require('../../models/user');

module.exports = new LocalStrategy(function(username, password, done) {
	var e = [];
	User.findOne({'login': username}, function(err, result) {
		if (err) {
			return done(err, null);
		} else if (result !== null) {
			if (result.password) {
				bcrypt.compare(password, result.password, function(err, res) {
					if (err) {
						e.push({name: 'user', m: __('Login failed')});
						return done(e, null);
					} else {
						done(null, result);
					}
				});
			} else {
				tryFlxer(username, password, done);
			}
		} else {
			e.push({name:"user", m:__("Login failed")});
			done(e, result);
		}
	});
});

var tryFlxer = function(username, password, cb) {
	// Try flxer
	request.post({
		uri:"https://flxer.net/api/login",
		headers:{'content-type': 'application/x-www-form-urlencoded'},
		body:querystring.stringify({login:username, password:password})
	}, function(err, res, body){
		var response = JSON.parse(body);
		if (response.login) {
			setPassword(login, password, function(e, o) {
				done(e, result);
			});
		} else {
			e.push({name:"user", m:__("Login failed")});
			done(e, result);
		}
	});
};

var setPassword = function(login, newPass, callback) {
	DB.users.findOne({login:login}, function(e, o){
		DB.saltAndHash(newPass, function(hash){
			o.password = hash;
			DB.users.save(o, {safe:true}, function(e, res) {
				callback(e, res);
			});
		});
	});
};

var saltAndHash = function(pass, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(pass, salt,
			function() { // progress
			},
			function(err, hash) {
				callback(hash);
			}
		);
	});
};
