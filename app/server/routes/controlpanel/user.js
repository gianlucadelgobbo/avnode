var DB = require('../../modules/db-manager');
var ObjectID = require('mongodb').ObjectID;
var Fnc = require('../../modules/functions');
var CT = require('../../modules/country-list');
var EM = require('../../modules/email-dispatcher');
var createsend = require('createsend');

var titles = {
	"public": 		__("Public data"),
	"mainimage": 	__("Main image"),
	"password": 	__("Change password"),
	"emails": 		__("Emails"),
	"private":		__("Private data"),
	"connections": 	__("Connections")
}

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
				res.render('forms/user_public', {locals: {form:"user_public", title:__("My Account")+": "+titles[subsez], countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			} else if (req.params[0]=="/mainimage" || req.params[0]=="/mainimage/") {
				var subsez = "mainimage";
				var msg = [];
				res.render('forms/user_mainimage', {locals: {title:__("My Account")+": "+titles[subsez], sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			} else if (req.params[0]=="/password" || req.params[0]=="/password/") {
				var subsez = "password";
				var msg = [];
				res.render('forms/user_password', {form:"user_password", locals: {title:__("My Account")+": "+titles[subsez], sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			} else if (req.params[0]=="/emails" || req.params[0]=="/emails/") {
				var subsez = "emails";
				var msg = [];
				var conta = 0;
				result.emails.forEach(function(item, index, theArray) {
					var CS = new createsend('a1df774dbf1832f1e4177589d54ef8eb');
					CS.subscriberDetails("ec6de6ef7a4a0cf81d73e0263d8017f2", result.emails[index].email, function (e,o) {
						for (item in o.CustomFields) {
							if (o.CustomFields[item].Key=="topic") {
								if (!result.emails[index].mailinglists) result.emails[index].mailinglists = {};
								result.emails[index].mailinglists[o.CustomFields[item].Value] = 1;
							}
							if (o.CustomFields[item].Key=="lang") {
								result.emails[index].lang = o.CustomFields[item].Value.toLocaleLowerCase();
							}
						}
						if (conta==theArray.length-1) {
							res.render('forms/user_emails', {locals: {title:__("My Account")+": "+titles[subsez], countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
						}
						conta++;
					});
				});
			} else if (req.params[0]=="/private" || req.params[0]=="/private/") {
				var subsez = "private";
				var msg = [];
				res.render('forms/user_private', {form:"user_private", locals: {title:__("My Account")+": "+titles[subsez], countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			} else if (req.params[0]=="/connections" || req.params[0]=="/connections/") {
				var subsez = "connections";
				var msg = [];
				res.render('forms/user_connections', {locals: {title:__("My Account")+": "+titles[subsez], countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.user });
			}
		});
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
		exports["validate_"+form](req, function(errors, o, m){
			if (errors.length === 0){
				if (o._id) {
				  	DB.users.findOne({_id:new ObjectID(o._id)},function(e, result) {
				  		delete o._id;
				  		delete o.collection;
				  		delete o.form;
				  		var newItem = result;
				  		//var newItem = {};
				  		for(var item in o) {
				  			newItem[item] = o[item];
				  		}
						console.dir("CAZZO");
						console.dir(newItem);
						var sections = ["events","footage","playlists","gallery","performances","tvshow"];
						var miniuser = {_id:newItem._id,old_id:newItem.old_id,display_name:newItem.display_name,permalink:newItem.permalink,files:newItem.files,stats:newItem.stats,members:newItem.members};
						for (var item in sections) {
							console.dir("bella item "+sections[item]);
							if (newItem[sections[item]] && newItem[sections[item]].length) {
								for (var a=0;a<newItem[sections[item]].length;a++) {
										console.dir("bella2 sections[item]"+sections[item]);
										console.dir("bella2 newItem[sections[item]].length"+newItem[sections[item]].length);
									for (var b=0;b<newItem[sections[item]][a].users.length;b++) {
										console.dir("bella3 sections[item]"+sections[item]);
										console.dir(newItem[sections[item]][a].users[b].permalink);
										console.dir(newItem[sections[item]][a].users[b]._id);
										console.dir(miniuser._id);
										console.dir(newItem._id);
//										if (newItem[sections[item]][a].users[b].permalink == miniuser.permalink) newItem[sections[item]][a].users[b] = miniuser;
										if (newItem[sections[item]][a].users[b]._id.equals(miniuser._id)) newItem[sections[item]][a].users[b] = miniuser;
									}
								}
							}
						}
				  		DB.users.save(newItem, {safe:true}, function(e, success) {
						  	DB.users.findOne({_id:result._id},function(e, result3) {
						  		result3.form = form;
						  		result3.collection = sez;
						  		DB.updateUserRel(result._id, function(success) {
									res.render('forms/'+form, {locals: {form:form, title:__("My Account")+": "+titles[subsez], countries: CT, sez:sez, subsez:subsez, result:result3, msg:{c:[{m:m}]},Fnc:Fnc}, user : req.session.user });
						  		});
					  		});
				  		});
					});
				}
			} else {
				res.render('forms/'+form, {locals: {form:"user_public", title:__("My Account")+": "+titles[subsez], countries: CT, sez:sez, subsez:subsez, result:req.body, msg:{e:errors},Fnc:Fnc}, user : req.session.user });
			}
  		});
	}
};

exports.validate_user_private = function (req,callback) {
	var o = req.body;
	var tmp = o.birthdate.split("-");
	o.birth_date = new Date(o.birthdate);
	delete o.birth;
	delete o.birthdate;
	var errors = [];
	if (o.name=="") errors.push({name:"name",m:__("Name can not be empty")});
	if (o.surname=="") errors.push({name:"surname",m:__("Surname can not be empty")});
	if (o.gender=="") errors.push({name:"gender",m:__("Gender can not be empty")});
	if (o.citizenship=="") errors.push({name:"gender",m:__("Country of citizenship can not be empty")});
	if (!((parseFloat(tmp[2])==o.birth_date.getDate()) && (parseFloat(tmp[1])-1==o.birth_date.getMonth()) && (parseFloat(tmp[0])==o.birth_date.getFullYear()))) errors.push({name:"birthdate",m:__("Birth date is not valid")});
	console.dir(o);
	console.dir(o.birth_date.getFullYear());
	console.dir(parseFloat(tmp[0]));
	callback(errors, o, __("Data saved"));
}

exports.validate_user_password = function (req,callback) {
	var o = req.body;
	var errors = [];
	if (o.password != o.password_confirm) {
		errors.push({name:"password_confirm",m:__("Password does not match the confirm password")});
	}
	if (o.password.length<8) {
		errors.push({name:"password",m:__("Password is too short, use at least 8 character")});
	}
	DB.saltAndHash(o.password, function(hash){
		o.data = {};
		o.data.password = hash;
		delete o.password;
		delete o.password_confirm;
		o.doc_id = o._id;
		o.act = "password";
		delete o._id;
		DB.saltAndHash(o.password+req.session.user.emails[0].email,function(hash){
			o.code = hash;
			o.msg = {title:__("Password confirmation"),text:__("Password updated with success, please log in")};
			DB.temp.insert(o, {safe: true}, function(err, record){
				text = _config.siteurl+"/confirm/?code="+o.code;
				EM.sendMail({
				   text:    text, 
				   to:      req.session.user.emails[0].email,
				   subject: _config.sitename + " | " + __("Password confirmation")
				}, function(err, message) {
					delete o.password;
					delete o.code;
					o._id = o.doc_id;
					delete o.doc_id;
					callback(errors, o, __("Password confirmation sent by email"));
				});
	  		});
  		});
	});
}

exports.validate_user_public = function (req,callback) {
	var o = req.body;
	var errors = [];
	for(item in o.locations) {
		o.locations[item] = JSON.parse(o.locations[item]);
	}
	var q = {permalink:o.permalink};
	if (o._id) q._id = {$ne:new ObjectID(o._id)};
	DB.users.findOne(q, function(err, result) {
		if (result) errors.push({name:"permalink",m:__("Profile url already in use")});
		if (o.display_name=="") errors.push({name:"display_name",m:__("Stage name can not be empty")});
		if (!o.locations || o.locations.length==0) errors.push({name:"locations",m:__("Please insert at least 1 place where you are based")});
		callback(errors, o, __("Data saved"));
	});
}
