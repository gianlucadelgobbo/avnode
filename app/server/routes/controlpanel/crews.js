var DB = require('../../modules/db-manager');
var ObjectID = require('mongodb').ObjectID;
var Fnc = require('../../modules/general-functions');

var titles = {
	"public": 		__("Main data"),
	"mainimage": 	__("Main image"),
	"members": 		__("Members")
}

exports.get = function get(req, res) {
	if (req.session.passport.user == null) {
		res.redirect('/controlpanel/login/?from='+req.url);
	} else {
		var sez = "performers";
		if (req.params.length==0 || req.params[0]=="" || req.params[0]=="/") {
			var ids = [];
			//for(var crew in req.session.passport.user.crews) ids.push(req.session.passport.user.crews[crew]._id);
			for(var crew in req.session.passport.user.crews) ids.push(new ObjectID(req.session.passport.user.crews[crew]._id));
			//var ids = [req.session.passport.user.permalink];
			Fnc.getList(req.params[0], sez, res, ids, function(err, tot, records, conf){
				res.render('forms/crews', {title:__("Crews"), sez:sez, tot:tot, path:conf.path, sort:conf.sort, filter:conf.filter, skip:conf.skip, result:records, Fnc:Fnc, user : req.session.passport.user});
			});
		} else {
			var p = Fnc.parseParams(req.params[0]);
			var page = p.page;
			var params2 = p.params2;
            if (params2[0] == "new") {
                var subsez = "new";
                var msg = [];
                res.render('forms/crew_public', {form:"crew_public", title:__("Create a new crew"), sez:sez, subsez:subsez, result:{}, msg:msg,Fnc:Fnc, user : req.session.passport.user });
            } else {
                DB.canIeditThis("users", {"permalink":params2[0]}, req.session.passport.user, function (result) {
                    if (result) {
                        var sez = "performers";
                        if (params2.length==1) {
                            var subsez = "public";
                            var msg = [];
                            res.render('forms/crew_public', {form:"crew_public", title:result.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
                        } else if (params2[1]=="mainimage") {
                            var subsez = "mainimage";
                            var msg = [];
                            res.render('forms/crew_mainimage', {form:"crew_mainimage", title:result.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
                        } else if (params2[1]=="members") {
                            var subsez = "members";
                            var msg = [];
                            //DB.temp.findOne({doc_id:new ObjectID(result._id)}, function(e, result2) {
                            DB.temp.find({doc_id:result._id.toString()}).toArray(function(e, result2) {
                                if (result2.length) result.membersnotconfirmed = result2;
                                res.render('forms/crew_members', {form:"crew_members", title:result.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
                            });
                        }
                    } else {
                        res.render('forms/cannotedit', {user : req.session.passport.user });
                    }
                });

            }
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
        if (req.body._id) {
            DB.canIeditThis("users", {_id:new ObjectID(req.body._id)}, req.session.passport.user, function (result) {
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
                                DB.users.save(newItem, {safe:true}, function(e, success) {
                                    DB.users.findOne({_id:result._id},function(e, result3) {
                                        result3.form = form;
                                        result3.collection = sez;
                                        DB.updateUserRel(result._id, function(success) {
                                            res.render('forms/'+form, {form:form, title:result3.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:result3, msg:{c:[{m:m}]},Fnc:Fnc, user : req.session.passport.user });
                                        });
                                    });
                                });
                            } else {
                            }
                        } else {
                            res.render('forms/'+form, {form:"user_public", title:result3.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:req.body, msg:{e:errors},Fnc:Fnc, user : req.session.passport.user });
                        }
                    });
                } else {
                    res.render('forms/cannotedit', {user : req.session.passport.user });
                }
            });
        } else {
            exports["validate_"+form](req, function(errors, o, m){
                if (errors.length === 0){
                    delete o._id;
                    delete o.collection;
                    delete o.form;
                    var newItem = {};
                    for(item in o) {
                        newItem[item] = o[item];
                    }
                    newItem["members"] = {
                        old_id: '13576',
                        permalink: 'deftoo',
                        display_name: 'ioann maria/Deftoo',
                        _id: '51707638d931639094000127',
                        files: [Object],
                        stats: [Object]
                    };
                    if (o._id) {
                        /*
                        DB.users.save(newItem, {safe:true}, function(e, success) {
                            DB.users.findOne({_id:result._id},function(e, result3) {
                                result3.form = form;
                                result3.collection = sez;
                                DB.updateUserRel(result._id, function(success) {
                                    res.render('forms/'+form, {form:form, title:result3.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:result3, msg:{c:[{m:m}]},Fnc:Fnc, user : req.session.passport.user });
                                });
                            });
                        });
                       */
                    } else {
                    }
                } else {
                    res.render('forms/'+form, {form:"user_public", title:result3.display_name+": "+titles[subsez], sez:sez, subsez:subsez, result:req.body, msg:{e:errors},Fnc:Fnc, user : req.session.passport.user });
                }
            });
        }
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

