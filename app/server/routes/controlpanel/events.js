var DB = require('../../modules/db-manager');
var Fnc = require('../../modules/general-functions');
var CT = require('../../modules/country-list');
var ObjectID = require('mongodb').ObjectID;
var CT = require('../../modules/country-list');
var util = require("util");
function ins(value) { console.log(util.inspect(value, false, null)); }

var titles = {
	"public": 		__("Main data"),
	"mainimage": 	__("Main image"),
	"members": 		__("Members")
}

exports.get = function get(req, res) {
	if (req.session.passport.user == null) {
		res.redirect('/controlpanel/login/?from='+req.url);
	} else {
		var sez = "events";
		if (req.params.length==0 || req.params[0]=="" || req.params[0]=="/") {
			var ids = [new ObjectID(req.session.passport.user._id)];
			for(var crew in req.session.passport.user.crews) ids.push(new ObjectID(req.session.passport.user.crews[crew]._id));
			//var ids = [req.session.passport.user.permalink];
			//for(var crew in req.session.passport.user.crews) ids.push(req.session.passport.user.crews[crew].permalink);
			Fnc.getList(req.params[0], sez, res, ids, function(err, tot, records, conf){
				console.dir("bella");
				res.render('forms/'+_config.sections[sez].view_list, {title:_config.sections[sez].title, sez:sez, tot:tot, path:conf.path, sort:conf.sort, filter:conf.filter, skip:conf.skip, result:records, Fnc:Fnc, user : req.session.passport.user});
			});
		} else {
			var p = Fnc.parseParams(req.params[0]);
			var page = p.page;
			var params2 = p.params2;
			console.dir(p);
			DB.canIeditThis("events", {"permalink":params2[0]}, req.session.passport.user, function (result) {
				if (result) {
                    console.log(result);
					var sez = "events";
					if (params2.length==1) {
						var subsez = "public";
						var msg = [];
						res.render('forms/event_public', {form:"event_public", title:result.title+": "+__("Main data"), sez:sez, subsez:subsez, countries: CT, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
					} else if (params2[1]=="mainimage") {
						var subsez = "mainimage";
						var msg = [];
						res.render('forms/event_mainimage', {title:result.title+": "+__("Main image"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
					} else if (params2[1]=="partners") {
						var subsez = "partners";
						var msg = [];
                        DB.temp.find({doc_id:result._id.toString()}).toArray(function(e, result2) {
                            console.dir("NOT CONFIRMED");
                            console.dir(result2);
                            if (result2.length) result.partnersnotconfirmed = result2;
                            //res.render('forms/crew_partners', {title:result.display_name+": "+__("Partners"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
                            res.render('forms/event_partners', {title:result.title+": "+__("Partners"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
                        });
					} else if (params2[1]=="performances") {
						var subsez = "performances";
						var msg = [];
						res.render('forms/event_performances', {title:result.title+": "+__("Performances"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
					} else if (params2[1]=="gallery") {
						var subsez = "gallery";
						var msg = [];
						res.render('forms/event_gallery', {title:result.title+": "+__("Gallery"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
					} else if (params2[1]=="settings") {
						var subsez = "settings";
						var msg = [];
						res.render('forms/event_settings', {title:result.title+": "+__("Settings"), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
					}
				} else {
					res.render('forms/cannotedit', {user : req.session.passport.user });
				}
			});
		}
	}
};
exports.post = function get(req, res) {
	if (req.session.passport.user == null) {
		res.redirect('/controlpanel/login/?from='+req.url);
	} else {
		var tmp = req.body.form.split("_");
		var form = req.body.form;
		var sez = tmp[0];
		var subsez = tmp[1];
		DB.canIeditThis("events", {_id:new ObjectID(req.body._id)}, req.session.passport.user, function (result) {
			if (result){
				exports["validate_"+form](req, function(errors, o, m){
					if (errors.length === 0){
						if (o._id) {
					  		delete o._id;
					  		delete o.collection;
					  		delete o.form;
					  		var newItem = result;
					  		//var newItem = {};
					  		for(item in o) {
					  			newItem[item] = o[item];
					  		}
					  		DB.events.save(newItem, {safe:true}, function(e, success) {
					  		  	DB.events.findOne({_id:result._id},function(e, result3) {
							  		result3.form = form;
							  		result3.collection = sez;
							  		DB.updateEventRel(result._id, function(success) {
										res.render('forms/'+form, {form:form, title:result3.title+": "+titles[subsez], sez:sez, subsez:subsez, countries: CT, result:result3, msg:{c:[{m:m}]},Fnc:Fnc, user : req.session.passport.user });
							  		});
						  		});
					  		});
                            /*
                            */
                        }
					} else {
						res.render('forms/'+form, {form:"user_public", title:result.title+": "+titles[subsez], sez:sez, subsez:subsez, countries: CT, result:req.body, msg:{e:errors},Fnc:Fnc, user : req.session.passport.user });
					}
		  		});
			} else {
				res.render('forms/cannotedit', {user : req.session.passport.user });
			}
  		});
	}
};

exports.validate_event_public = function (req,callback) {
	var o = req.body;
	var errors = [];
	var q = {permalink:o.permalink};
	if (o._id) q._id = {$ne:new ObjectID(o._id)};
	DB.events.findOne(q, function(err, result) {
		if (result) errors.push({name:"permalink",m:__("Events url already in use")});
		if (o.title=="") errors.push({name:"title",m:__("Stage name can not be empty")});
		callback(errors, o, __("Data saved"));
	});
}

