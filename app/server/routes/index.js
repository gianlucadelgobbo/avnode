var User = require('../models/user');
var CT = require('../modules/country-list');

exports.get = function get(req, res) {
  res.render('index', {
    title: __('Home Page'),
    sez: "home",
    countries: CT,
    result: {},
    user: req.user
  });
}
