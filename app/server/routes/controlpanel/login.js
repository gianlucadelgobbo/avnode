var passport = require('passport');

exports.get = function (req, res) {
	var passport_user = req.session.passport && req.session.passport.user ? req.session.passport.user : {};
	res.render('forms/login', {title : "Login", "from":req.query.from, result:{}, user : passport_user });
};

exports.post = function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/controlpanel/login',
    failureFlash: false
  });
};
