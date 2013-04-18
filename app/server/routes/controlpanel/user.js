var DB = require('../../modules/db-manager');
var ObjectID = require('mongodb').ObjectID;
var Fnc = require('../../modules/functions');
var CT = require('../../modules/country-list');

exports.get = function get(req, res) {
	if (req.session.user == null) {
		res.redirect('/controlpanel/login/?from='+req.url);
	} else {
		console.dir(req.params);
		var id = (req.query.id ? req.query.id : req.session.user._id);
		DB.users.findOne({_id:new ObjectID(id)}, function(err, result){
			var sez = "user";
			if (req.params[0]=="" || req.params[0]=="/") {
				var subsez = "public";
				var msg = [];
				res.render('forms/user_public', {locals: {title:__("My Account")+": "+__("Public data"), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			} else if (req.params[0]=="/mainimage" || req.params[0]=="/mainimage/") {
				var subsez = "mainimage";
				var msg = [];
				res.render('forms/user_mainimage', {locals: {title:__("My Account")+": "+__("Main image"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			} else if (req.params[0]=="/password" || req.params[0]=="/password/") {
				var subsez = "password";
				var msg = [];
				res.render('forms/user_password', {locals: {title:__("My Account")+": "+__("Change password"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			} else if (req.params[0]=="/emails" || req.params[0]=="/emails/") {
				var subsez = "emails";
				var msg = [];
				res.render('forms/user_emails', {locals: {title:__("My Account")+": "+__("Emails"), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			} else if (req.params[0]=="/private" || req.params[0]=="/private/") {
				var subsez = "private";
				var msg = [];
				res.render('forms/user_private', {locals: {title:__("My Account")+": "+__("Private data"), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			} else if (req.params[0]=="/connections" || req.params[0]=="/connections/") {
				var subsez = "connections";
				var msg = [];
				res.render('forms/user_connections', {locals: {title:__("My Account")+": "+__("Connections"), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			}
		});
	}
};
