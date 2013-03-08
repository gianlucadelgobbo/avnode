var DB = require('../modules/db-manager');
var CT = require('../modules/country-list');

exports.get = function get(req, res) {
	res.render('index', {	locals: { title: __('Home Page'), countries : CT, result : {}, user : req.session.user } });
};

exports.post = function post(req, res) {
};
