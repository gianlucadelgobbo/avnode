var http = require('http');
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
var DB = require('../../modules/db-manager');
var functions = require('../../modules/functions');

exports.get = function get(req, res) {
	res.render('forms/login', {	locals: {title : "Login", "from":req.query.from}, user : req.session.user });
}
exports.post = function post(req, res) {
	functions.validateFormLogin(req.body, function(e, o) {
		if (e.length) {
			if (req.body.ajax) {
				res.send({msg:{e:e}}, 200);
			} else {
				o._id = o.id;
				res.render('forms/login', { locals: { title: __('Hello - Please Login To Your Account'), result : o, msg:{e:e}, from:req.body.from}, user : req.session.user});
			}
		} else {
			req.session.user = o;
			if (req.param('remember-me') == 'true'){
				res.cookie('user', o.user, { maxAge: 900000 });
				res.cookie('pass', o.pass, { maxAge: 900000 });
				res.cookie('role', o.role, { maxAge: 900000 });
			}
			if (req.param('ajax') == 'true') {
				res.send(o, 200);
			} else {
				var redirect = req.body.from ? req.body.from : '/';
				console.dir("cazzo"+redirect);
				res.redirect(redirect);
			}
		}
	});
}