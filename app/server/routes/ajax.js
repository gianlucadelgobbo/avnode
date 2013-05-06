var DB = require('../modules/db-manager');
var Fnc = require('../modules/functions');
var ObjectID = require('mongodb').ObjectID;
var EM = require('../modules/email-dispatcher');
var createsend = require('createsend');

exports.get = function get(req, res) {
	var pathArray = req.url.split("/");
	var output = (req.query.output ? req.query.output : false);
	if (pathArray[0]=="") pathArray.shift();
	if (pathArray[pathArray.length-1]=="") pathArray.pop();
	if (pathArray[pathArray.length-1].indexOf("output")!=-1) pathArray.pop();
	console.dir(pathArray);
	if (pathArray.length > 0) {
		if (pathArray[1] == "checkPermalink") {
			if(req.query.permalink && req.query.collection) {
				var q = {permalink:req.query.permalink};
				if (req.query._id) q._id = {$ne:new ObjectID(req.query._id)};
				DB[req.query.collection].findOne(q, function(e, o){
					var result = o ? {success:false, msg:__("Profile url already in use")} : {success:true, msg:__("Profile url is valid")};
					res.send(result);			
				});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "sendVerificationEmail") {
			if(req.query.email && req.query.collection) {
				DB[req.query.collection].findOne({"emails.email":req.query.email}, function(e, o){
					if (o) {
						res.send({success:false, msg:__("Email already in use")});			
					} else {
						DB[req.query.collection].findOne({"_id":new ObjectID(req.query.doc_id)}, function(e, o){
							o.emails.push({email:req.query.email,valid:0,public:0,primary:0});
							DB[req.query.collection].save(o, {safe:true}, function(e, success) {
								DB.saltAndHash(req.query.email,function(hash){
									req.query.code = hash;
									req.query.act = "newmail";
									req.query.data = {email:req.query.email};
									delete req.query.email;
									req.query.redirect = "/controlpanel/user/emails/";
									req.query.msg = {title:__("Email verification"),text:__("Email verified with success, please continue")};
									console.dir(req.query);
									DB.temp.insert(req.query, {safe: true}, function(err, record){
										text = _config.siteurl+"/confirm/?code="+req.query.code;
										EM.sendMail({
										   text:    text, 
										   to:      req.query.data.email,
										   subject: _config.sitename + " | " + __("Email verification")
										}, function(err, message) {
											var result = err ? {success:false, msg:__("Email verification sending failed")} : {success:true, msg:__("Email verification sent by email")};
											res.send(result);			
										});
							  		});
									/*
							  		*/
						  		});
					  		});
				  		});
				  	}
				});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "deleteEmail") {
			if(req.query.email && req.query.collection) {
				DB[req.query.collection].find({"emails.email":req.query.email}).toArray(function(e, results){
					if (results) {
						results.forEach(function(result,index,theArray){
							console.dir(result.emails.length);
							console.dir(result.emails);
							for(var a=result.emails.length-1;a>=0;a--){
								if (result.emails[a].email==req.query.email && result.emails[a].primary!=1) result.emails.splice(a,a);
							}
							console.dir(result.emails.length);
							if (index==theArray.length-1) {
								DB[req.query.collection].save(result, {safe:true}, function(e, success) {
									res.send({success:true, msg:__("Email deleted")});			
									console.dir(result.emails);
								});
							}
						});
					} else {
						res.send(404);
				  	}
				});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "setPrimary") {
			if(req.query.email && req.query.collection && req.query.doc_id) {
				DB[req.query.collection].find({"emails.email":req.query.email,"_id":new ObjectID(req.query.doc_id)}).toArray(function(e, results){
					if (results) {
						results.forEach(function(result,index,theArray){
							console.dir(result.emails.length);
							console.dir(result.emails);
							var newMails = [];
							for(var a=0;a<result.emails.length;a++){
								if (result.emails[a].email==req.query.email) {
									 result.emails[a].primary = 1;
									 newMails.push(result.emails[a]);
								} else {
									 result.emails[a].primary = 0;
								}
							}
							for(var a=0;a<result.emails.length;a++){
								if (result.emails[a].email!=req.query.email) {
									 newMails.push(result.emails[a]);
								}
							}
							result.emails = newMails;
							console.dir(result.emails.length);
							if (index==theArray.length-1) {
								DB[req.query.collection].save(result, {safe:true}, function(e, success) {
									res.send({success:true, msg:__("Email is primary")});			
									console.dir(result.emails);
								});
							}
						});
					} else {
						res.send(404);
				  	}
				});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "setNewsletter") {
			if(req.query.email && req.query.newsletters && req.query.doc_id) {
				var CS = new createsend('a1df774dbf1832f1e4177589d54ef8eb');
				CS.subscriberDetails("ec6de6ef7a4a0cf81d73e0263d8017f2", req.query.email, function (e,o) {
					console.dir("bella");
					console.dir(o);
					var add = 1;
					for(var a=o.CustomFields.length-1;a>=0;a--){
						console.dir(a+" "+o.CustomFields[a].Key);
						if (o.CustomFields[a].Key=="topic" || o.CustomFields[a].Key=="flxer_id" || o.CustomFields[a].Key=="lang") o.CustomFields.splice(a,a);
					}
					console.dir(o);
					var topics = req.query.newsletters.split(",");
					for(item in topics) {
						if (topics[item]) o.CustomFields.push({"Key": "topic","Value":topics[item]});
					}
					o.CustomFields.push({"Key": "flxer_id","Value":req.query.doc_id});
					o.CustomFields.push({"Key": "lang","Value":req.query.lang.toUpperCase()});
					console.dir(o);
					CS.subscriberUpdate("ec6de6ef7a4a0cf81d73e0263d8017f2", req.query.email, o, function (e,o) {
						res.send(o);
					});
				});
			} else {
				res.send(404);
			}
		} else {
			res.send(404);
		}
	} else {
		res.send(404);
	}
};
