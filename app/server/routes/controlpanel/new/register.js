var http = require('http');
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
var CT = require('../../../modules/country-list');
var DB = require('../../../modules/db-manager');

exports.get = function get(req, res) {
	res.render('form/register', {  locals: {title : "Register", countries: CT} });
}
