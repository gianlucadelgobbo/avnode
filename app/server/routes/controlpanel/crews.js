var DB = require('../../modules/db-manager');
var ObjectID = require('mongodb').ObjectID;
var Fnc = require('../../modules/functions');

exports.get = function get(req, res) {
	if (req.session.user == null) {
		res.redirect('/controlpanel/login/?from='+req.url);
	} else {
		var sez = "performers";
		if (req.params.length==0 || req.params[0]=="" || req.params[0]=="/") {
			var ids = [];
			//for(var crew in req.session.user.crews) ids.push(req.session.user.crews[crew]._id);
			for(var crew in req.session.user.crews) ids.push(new ObjectID(req.session.user.crews[crew]._id));
			//var ids = [req.session.user.permalink];
			console.dir(ids);
			Fnc.getList(req.params[0], sez, res, ids, function(err, tot, records, conf){
				console.dir("bella");
				res.render('forms/crews', {locals: {title:__("Crews"), sez:sez, tot:tot, path:conf.path, sort:conf.sort, filter:conf.filter, skip:conf.skip, result:records, Fnc:Fnc}, user : req.session.user});
			});
		} else {
			var p = Fnc.parseParams(req.params[0]);
			var page = p.page;
			var params2 = p.params2;
			console.dir(p);
			DB.users.findOne({"permalink":params2[0]}, function(err, result) {
				var sez = "performers";
				if (params2.length==1) {
					var subsez = "public";
					var msg = [];
					res.render('forms/crew_public', {locals: {title:result.display_name+": "+__("Main data"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
				} else if (params2[1]=="mainimage") {
					var subsez = "mainimage";
					var msg = [];
					res.render('forms/crew_mainimage', {locals: {title:result.display_name+": "+__("Main image"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
				}
			});
			/*
			DB.users.findOne({_id:new ObjectID(id)}, function(err, result){
				if (req.params[0]=="/mainimage" || req.params[0]=="/mainimage/") {
					var sez = "mainimage";
					var msg = [];
					res.render('forms/event_mainimage', {locals: {title:__("My Account")+": "+__("Main image"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
				} else if (req.params[0]=="/password" || req.params[0]=="/password/") {
					var sez = "password";
					var msg = [];
					res.render('forms/event_password', {locals: {title:__("My Account")+": "+__("Change password"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
				} else if (req.params[0]=="/emails" || req.params[0]=="/emails/") {
					var sez = "emails";
					var msg = [];
					res.render('forms/event_emails', {locals: {title:__("My Account")+": "+__("Emails"), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
				} else if (req.params[0]=="/private" || req.params[0]=="/private/") {
					var sez = "private";
					var msg = [];
					res.render('forms/event_private', {locals: {title:__("My Account")+": "+__("Private data"), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
				} else if (req.params[0]=="/connections" || req.params[0]=="/connections/") {
					var sez = "connections";
					var msg = [];
					res.render('forms/event_connections', {locals: {title:__("My Account")+": "+__("Connections"), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
				}
			});
			*/
		}
	}
};
