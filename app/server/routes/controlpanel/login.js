var passport = require('passport');

exports.get = function (req, res) {
    console.log("forms/login");
    res.render('forms/login', {
    title : "Login",
    user: req.user,
    message: req.flash()
  });
};
