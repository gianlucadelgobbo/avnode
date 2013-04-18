var DB = require('../modules/db-manager');
var CT = require('../modules/country-list');

exports.get = function get(req, res) {
	if (req.cookies.user) {
		DB.users.findOne({user:req.cookies.user}, function(e, o) {
			if (o) {
				if (o.pass === req.cookies.pass) {
					req.session.user = o;
				}
			}
		});
	}
	res.render('index', {	locals: { title: __('Home Page'), sez:"home", countries : CT, result : {}, user : req.session.user } });
};

exports.post = function post(req, res) {
};
