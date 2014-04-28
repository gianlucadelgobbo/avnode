var request = require('request');
var ObjectID = require('mongodb').ObjectID;
var DB = require('../../modules/db-manager');
var bcrypt = require('bcrypt-nodejs');

exports.get = function get(req, res) {
	res.render('forms/login', {	locals: {title : "Login", "from":req.query.from}, user : req.session.user });
}
exports.post = function post(req, res) {
	exports.validateFormLogin(req.body, function(e, o) {
		if (e && e.length) {
			if (req.body.ajax) {
				res.send({msg:{e:e}}, 200);
			} else {
				//o._id = o.id;
				res.render('forms/login', { locals: { title: __('Hello - Please Login To Your Account'), msg:{e:e}, from:req.body.from}, user : req.session.user});
			}
		} else {
			console.log(_config.locales[o.lang]);
			setLocale("it");
			console.log(getLocale());
			req.session.user = o;
			if (req.body.remember == 'true'){
				res.cookie('user', o.user, { maxAge: 900000 });
				res.cookie('pass', o.pass, { maxAge: 900000 });
				res.cookie('role', o.role, { maxAge: 900000 });
			}
			if (req.body.ajax) {
				res.send(o, 200);
			} else {
				var redirect = req.body.from ? req.body.from : '/';
				res.redirect(redirect);
			}
		}
	});
}
exports.validateFormLogin = function (o,callback) {
	var e = [];
	DB.users.findOne({login:o.login}, function(err, result) {
		if (result == null){
			e.push({name:"user",m:__("User not found")});
			callback(e, result);
		} else {
			if (result.password) {
				bcrypt.compare(o.password, result.password, function(err, res) {
					if (res) {
						//console.dir("login interno");
						callback(e, result);
					} else {
						e.push({name:"user",m:__("Login failed")});
						callback(e, result);
					}
				});
			} else {
				request.post({
				    uri:"https://flxer.net/api/login",
				    headers:{'content-type': 'application/x-www-form-urlencoded'},
				    body:require('querystring').stringify({login:o.login, password:o.password})
			    },function(err, res, body){
			    	var ress = JSON.parse(body);
			        if (ress.login) {
			        	DB.setPassword(o.login, o.password, function(e, o) {
							callback(e, result);
						});
			        } else {
						e.push({name:"user",m:__("Login failed")});
						callback(e, result);
			        }
				});
			}
		}
	});
};
