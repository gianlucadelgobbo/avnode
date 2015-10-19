var DB = require('../modules/db-manager');
var CT = require('../modules/country-list');

exports.get = function get(req, res) {
	console.log(req.session);
	var uu;
	if (req.session.passport && req.session.passport.user) {
		uu = req.session.passport.user;
	}
    //console.log(req.session.passport.user);
	if (req.cookies && req.cookies.user) {
		DB.users.findOne({user:req.cookies.user}, function(e, o) {
			if (o) {
				if (o.pass === req.cookies.pass) {
					req.session.passport.user = o;
				}
			}
		});
	}
	res.render('index', { title: __('Home Page'), sez:"home", countries : CT, result : {}, user : uu });
};

exports.post = function post(req, res) {
};
