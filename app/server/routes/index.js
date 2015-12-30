var User = require('../models/user');
var CT = require('../modules/country-list');

exports.get = function get(req, res) {
	//console.log(req.cookies);
	//console.log(req);
	//console.log(req.session.passport.user);
	if (req.cookies.user) {
		if (req.cookies && req.cookies.user) {
			User.findOne({user: req.cookies.user}, function (e, o) {
				if (o) {
					if (o.pass === req.cookies.pass) {
						req.session.passport.user = o;
					}
				}
			});
		}
		res.render('index', {
			title: __('Home Page'),
			sez: "home",
			countries: CT,
			result: {},
			user: req.session.passport.user
		});
	} else {
		res.render('index', {
			title: __('Home Page'),
			sez: "home",
			countries: CT,
			result: {},
			user: {}
		});
	}
};
exports.post = function post(req, res) {

};
