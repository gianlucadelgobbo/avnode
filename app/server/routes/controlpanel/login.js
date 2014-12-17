var passport = require('passport');

exports.get = function (req, res) {
	res.render('forms/login', {title : "Login", "from":req.query.from, result:{}, user : req.session.passport.user });
}
exports.post = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		console.log("authenticate");
		console.log(err);
		console.log(user);
		console.log(info);
		if (err) {
			console.log("ERRORE LOGIN 1");
			//return next(err);
		}
		if (!user) {
			res.render('forms/login', {title : "Login", "from":req.body.from, result:req.body, msg:{e:[{m:info.message}]}, user : req.session.passport.user });
		} else {
			req.login(user, function(err) {
				if (err) {
					console.log("ERRORE LOGIN 2");
					console.log(err);
					res.render('forms/login', {title : "Login", "from":req.body.from, result:req.body, msg:{e:[{m:"stocazzo"}]}, user : req.session.passport.user });
				} else {
					return res.redirect(req.body.from ? req.body.from : '/' + user.login);
				}
			});

		}
	})(req, res, next);
}