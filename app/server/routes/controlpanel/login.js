var passport = require('passport');

exports.get = function (req, res) {
	res.render('forms/login', {
    title : "Login",
    user: req.user
  });
};
