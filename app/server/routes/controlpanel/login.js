var http = require('http');
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
var DB = require('../../modules/db-manager');

exports.get = function get(req, res) {
	res.render('form/login', {  locals: {title : "Login"} });
}
