var DB = require('../../modules/db-manager');
var ObjectID = require('mongodb').ObjectID;
var Fnc = require('../../modules/general-functions');

var titles = {
	"public": 		__("Main data"),
	"mainimage": 	__("Main image"),
	"members": 		__("Members")
}

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
			DB.canIeditThis("users", {"permalink":params2[0]}, req.session.user, function (result) {
				if (result) {
					var sez = "performers";
					if (params2.length==1) {
						var subsez = "public";
						var msg = [];
						res.render('forms/crew_public', {locals: {form:"crew_public", title:result.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
					} else if (params2[1]=="mainimage") {
						var subsez = "mainimage";
						var msg = [];
						res.render('forms/crew_mainimage', {locals: {form:"crew_mainimage", title:result.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
					} else if (params2[1]=="members") {
						var subsez = "members";
						var msg = [];
						res.render('forms/crew_members', {locals: {form:"crew_members", title:result.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
					}
				} else {
					res.render('forms/cannotedit', {locals: {}, user : req.session.user });
				}
			});
		}
	}
};
exports.post = function get(req, res) {
	if (req.session.user == null) {
		res.redirect('/controlpanel/login/?from='+req.url);
	} else {
		var tmp = req.body.form.split("_");
		var form = req.body.form;
		var sez = tmp[0];
		var subsez = tmp[1];
		DB.canIeditThis("users", {_id:new ObjectID(req.body._id)}, req.session.user, function (result) {
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
							console.dir("CAZZO");
							console.dir(newItem);
					  		DB.users.save(newItem, {safe:true}, function(e, success) {
							  	DB.users.findOne({_id:result._id},function(e, result3) {
							  		result3.form = form;
							  		result3.collection = sez;
							  		DB.updateUserRel(result._id, function(success) {
										res.render('forms/'+form, {locals: {form:form, title:result3.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:result3, msg:{c:[{m:m}]},Fnc:Fnc}, user : req.session.user });
							  		});
						  		});
					  		});
						}
					} else {
						res.render('forms/'+form, {locals: {form:"user_public", title:result3.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:req.body, msg:{e:errors},Fnc:Fnc}, user : req.session.user });
					}
		  		});
			} else {
				res.render('forms/cannotedit', {locals: {}, user : req.session.user });
			}
  		});
	}
};

exports.validate_crew_public = function (req,callback) {
	var o = req.body;
	var errors = [];
	var q = {permalink:o.permalink};
	if (o._id) q._id = {$ne:new ObjectID(o._id)};
	DB.users.findOne(q, function(err, result) {
		if (result) errors.push({name:"permalink",m:__("Profile url already in use")});
		if (o.display_name=="") errors.push({name:"display_name",m:__("Stage name can not be empty")});
		callback(errors, o, __("Data saved"));
	});
}

