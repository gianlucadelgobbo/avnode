var DB = require('../../modules/db-manager');
var Fnc = require('../../modules/functions');
var CT = require('../../modules/country-list');
var ObjectID = require('mongodb').ObjectID;
var CT = require('../../modules/country-list');
var util = require("util");
function ins(value) { console.log(util.inspect(value, false, null)); }
exports.get = function get(req, res) {
	if (req.session.user == null) {
		res.redirect('/controlpanel/login/?from='+req.url);
	} else {
		var sez = "performances";
		if (req.params.length==0 || req.params[0]=="" || req.params[0]=="/") {
			var ids = [new ObjectID(req.session.user._id)];
			for(var crew in req.session.user.crews) ids.push(new ObjectID(req.session.user.crews[crew]._id));
			//var ids = [req.session.user.permalink];
			//for(var crew in req.session.user.crews) ids.push(req.session.user.crews[crew].permalink);
			Fnc.getList(req.params[0], sez, res, ids, function(err, tot, records, conf){
				console.dir("bella");
				res.render('forms/'+_config.sections[sez].view_list, {locals: {title:_config.sections[sez].title, sez:sez, tot:tot, path:conf.path, sort:conf.sort, filter:conf.filter, skip:conf.skip, result:records, Fnc:Fnc}, user : req.session.user});
			});
		} else {
			var p = Fnc.parseParams(req.params[0]);
			var page = p.page;
			var params2 = p.params2;
			console.dir(p);
			DB.canIeditThis("performances", {"permalink":params2[0]}, req.session.user, function (result) {
				if (result) {
					var sez = "performances";
					if (params2.length==1) {
						var subsez = "maindata";
						var msg = [];
						res.render('forms/performance_maindata', {locals: {title:result.title+": "+__("Main data"), sez:sez, subsez:subsez, countries: CT, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
					} else if (params2[1]=="mainimage") {
						var subsez = "mainimage";
						var msg = [];
						res.render('forms/performance_mainimage', {locals: {title:result.title+": "+__("Main image"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
					} else if (params2[1]=="partners") {
						var subsez = "partners";
						var msg = [];
						res.render('forms/performance_partners', {locals: {title:result.title+": "+__("Partners"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
					} else if (params2[1]=="performances") {
						var subsez = "performances";
						var msg = [];
						res.render('forms/performance_performances', {locals: {title:result.title+": "+__("Performances"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
					} else if (params2[1]=="gallery") {
						var subsez = "gallery";
						var msg = [];
						res.render('forms/performance_gallery', {locals: {title:result.title+": "+__("Gallery"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
					} else if (params2[1]=="settings") {
						var subsez = "settings";
						var msg = [];
						res.render('forms/performance_settings', {locals: {title:result.title+": "+__("Settings"), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
					}
				} else {
					res.render('forms/cannotedit', {locals: {}, user : req.session.user });
				}
			});
		}
	}
};
exports.post = function post(req, res) {
	delete req.body.meridian;
	delete req.body.hour;
	delete req.body.minute;
	ins(req.body);
	var sez = "performances";
	var subsez = "settings";
	var msg = [];
	res.render('forms/performance_settings', {locals: {title:req.body.title+": "+__("Settings"), countries: CT, sez:sez, subsez:subsez, result:req.body, msg:msg,Fnc:Fnc}, user : req.session.user });
};
