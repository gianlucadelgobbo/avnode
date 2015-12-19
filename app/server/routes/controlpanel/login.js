var passport = require('passport');

exports.get = function (req, res) {
	var passport_user = req.session.passport && req.session.passport.user ? req.session.passport.user : {};
	res.render('forms/login', {title : "Login", "from":req.query.from, result:{}, user : passport_user });
};
exports.post = function(req, res, next) {
	var passport_user = req.session.passport && req.session.passport.user ? req.session.passport.user : {};
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			//return next(err);
		}
		if (!user) {
			res.render('forms/login', {title : "Login", "from":req.body.from, result:req.body, msg:{e:[{m:info.message}]}, user : passport_user });
		} else {
			req.logIn(user, function(err) {
				if (err) {
					res.render('forms/login', {title : "Login", "from":req.body.from, result:req.body, msg:{e:[{m:[err]}]}, user : passport_user });
				} else {
					return res.redirect(req.body.from ? req.body.from : '/' + user.login);
				}
			});
		}
	})(req, res, next);
};