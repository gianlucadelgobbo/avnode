var DB = require('../modules/db-manager');
var Fnc = require('../modules/functions');
var ObjectID = require('mongodb').ObjectID;
var EM = require('../modules/email-dispatcher');
var createsend = require('createsend');

exports.post = function get(req, res) {
	var pathArray = req.url.split("/");
	var output = (req.body.output ? req.body.output : false);
	if (pathArray[0]=="") pathArray.shift();
	if (pathArray[pathArray.length-1]=="") pathArray.pop();
	if (pathArray[pathArray.length-1].indexOf("output")!=-1) pathArray.pop();
	console.dir(pathArray);
	if (pathArray.length > 0) {
		if (pathArray[1] == "checkPermalink") {
			if(req.body.permalink && req.body.collection) {
				var q = {permalink:req.body.permalink};
				if (req.body._id) q._id = {$ne:new ObjectID(req.body._id)};
				DB[req.body.collection].findOne(q, function(e, o){
					var result = o ? {success:false, msg:__("Profile url already in use")} : {success:true, msg:__("Profile url is valid")};
					res.send(result);			
				});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "sendVerificationEmail") {
			console.dir(req.body);
			if(req.body.email && req.body.collection) {
				DB[req.body.collection].findOne({"emails.email":req.body.email}, function(e, o){
					if (o) {
						res.send({success:false, msg:__("Email already in use")});			
					} else {
						DB[req.body.collection].findOne({"_id":new ObjectID(req.body.doc_id)}, function(e, o){
							o.emails.push({email:req.body.email,valid:0,public:0,primary:0});
							DB[req.body.collection].save(o, {safe:true}, function(e, success) {
								DB.saltAndHash(req.body.email,function(hash){
									req.body.code = hash;
									req.body.act = "newmail";
									req.body.data = {email:req.body.email};
									delete req.body.email;
									req.body.redirect = "/controlpanel/user/emails/";
									req.body.msg = {title:__("Email verification"),text:__("Email verified with success, please continue")};
									console.dir(req.body);
									DB.temp.insert(req.body, {safe: true}, function(err, record){
										text = _config.siteurl+"/confirm/?code="+req.body.code;
										EM.sendMail({
										   text:    text, 
										   to:      req.body.data.email,
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
// EVENT PARTNER
		} else if (pathArray[1] == "updatePartners") {
			if(req.body.partners && req.body.collection) {
				DB[req.body.collection].findOne({"_id":new ObjectID(req.body._id)}, function(e, o){
					o.partners = req.body.partners;
					DB[req.body.collection].save(o, {safe:true}, function(e, success) {
						console.dir(o);
						res.send(o);			
			  		});
		  		});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "deletePartner") {
			if(req.body._id && req.body.id_partner) {
				DB.users.findOne({"_id":new ObjectID(req.body.id_partner)}, function(e, o){
					if (o.partnerships && o.partnerships.length) {
						o.partnerships = o.partnerships.filter(function (element, index, array) {
							return (element._id.toString() !== req.body._id);
						});
						DB.users.save(o, {safe:true}, function(e, success) {
							console.dir("SEND AN EMAIL TO THE PARTNER REMOVED");
							res.send(o);			
				  		});
					} else {
						DB.events.find({"partners._id":new ObjectID(req.body.id_partner)}, {fields:{_id:1,title:1,permalink:1,users:1,files:1,categories:1,stats:1,date_time_venue:1}}).toArray(function(e, subrecords){
							//if (o.partnership) delete o.partnership;
							if (subrecords) o.partnerships = subrecords;
							DB.users.save(o, {safe:true}, function(e, success) {
								console.dir("SEND AN EMAIL TO THE PARTNER REMOVED");
								res.send(o);			
					  		});
				  		});
					}
		  		});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "invitePartner") {
			if(req.body.data && req.body.collection) {
				DB.saltAndHash(req.body._id+req.body.data._id,function(hash){
					req.body.code = hash;
					req.body.act = "invitePartner";
					req.body.collection = "users";
					req.body.redirect = "/"+req.body.permalink+"/";
					req.body.msg = {title:__("Accept invitation to be partner of")+": "+req.body.title,text:__("Invitation accepted with success, please continue")};
					console.dir(req.body);
					DB.temp.insert(req.body, {safe: true}, function(err, record){
						text = _config.siteurl+"/confirm/?code="+req.body.code;
						EM.sendMail({
						   text:    text, 
						   //to:      req.body.data.emails[0].email,
						   to:      "g.delgobbo@flyer.it",
						   subject: _config.sitename + " | " + __("Invitation to")+": "+req.body.crew_name
						}, function(err, message) {
							var result = err ? {success:false, msg:__("Email verification sending failed")} : {success:true, msg:__("Email verification sent by email")};
							res.send(result);			
						});
			  		});
					/*
			  		*/
		  		});
			} else {
				res.send(404);
			}
/*		} else if (pathArray[1] == "recreatePartnersEvent") {
			if(req.body.id) {
				DB.events.findOne({_id:new ObjectID(req.body.id)}, {fields:{_id:1,title:1,permalink:1,users:1,files:1,categories:1,stats:1,date_time_venue:1,partners:1}}, function(e, event) {
					console.dir({_id:new ObjectID(req.body.id)});
					console.dir(event);
					if (event.partners) {
						var minievent = {_id:event._id,title:event.title,permalink:event.permalink,users:event.users,files:event.files,categories:event.categories,stats:event.stats,date_time_venue:event.date_time_venue};
						//delete minievent.partners;
						var conta = 0;
						event.partners.forEach(function(item){
							DB.users.findOne({"_id":new ObjectID(item._id)}, function(err, subrecord){
								if (!subrecord.partnership) subrecord.partnership = [];
								var add = true;
								for(event2 in subrecord.partnership) {
									if (subrecord.partnership[event2]._id==minievent._id) add = false;
								}
								if (add) subrecord.partnership.push(minievent);
								console.log(subrecord);
								DB.users.save(subrecord, {safe:true}, function(e, success) {
									conta++;
									if (event.partners.length==conta) {
										res.send({success:success});
									}
								});
							});
						});
					} else {
						res.send({success:false});
					}
		  		});
			} else {
				res.send(404);
			}
*/
// CREW MEMBERS
		} else if (pathArray[1] == "updateMembers") {
			if(req.body.members && req.body.collection) {
				DB[req.body.collection].findOne({"_id":new ObjectID(req.body._id)}, function(e, o){
					o.members = req.body.members;
					DB[req.body.collection].save(o, {safe:true}, function(e, success) {
						console.dir(o);
						res.send(o);			
			  		});
		  		});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "findMembers") {
			if(req.body.search && req.body.collection) {
				DB[req.body.collection].find({"display_name":new RegExp(req.body.search, "i"),"is_crew": 0}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1,emails:1}}).toArray(function(e, o){
					console.dir(o);
					res.send(o);			
					/*
					DB[req.body.collection].save(o, {safe:true}, function(e, success) {
						console.dir(o);
						res.send(o);			
			  		});
			  		*/
		  		});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "inviteMember") {
						console.dir(req.body);
			if(req.body.data && req.body.collection) {
				DB.saltAndHash(req.body._id+req.body.data._id,function(hash){
					req.body.code = hash;
					req.body.act = "inviteMember";
					req.body.collection = "users";
					req.body.redirect = "/"+req.body.permalink+"/";
					req.body.msg = {title:__("Accept invitation to")+": "+req.body.crew_name,text:__("Invitation accepted with success, please continue")};
					console.dir(req.body);
					DB.temp.insert(req.body, {safe: true}, function(err, record){
						text = _config.siteurl+"/confirm/?code="+req.body.code;
						EM.sendMail({
						   text:    text, 
						   //to:      req.body.data.emails[0].email,
						   to:      "g.delgobbo@flyer.it",
						   subject: _config.sitename + " | " + __("Invitation to")+": "+req.body.crew_name
						}, function(err, message) {
							var result = err ? {success:false, msg:__("Email verification sending failed")} : {success:true, msg:__("Email verification sent by email")};
							res.send(result);			
						});
			  		});
					/*
			  		*/
		  		});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "recreateUserCrews") {
			if(req.body.id) {
				DB.users.findOne({_id:new ObjectID(req.body.id)}, function(e, user) {
					DB.users.find({"members._id":new ObjectID(req.body.id)}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
						if (subrecords.length) user.crews = subrecords;
						console.log({"members._id":req.body.id});
						console.log(subrecords);
						DB.users.save(user, {safe:true}, function(e, success) {
							res.send({success:success});
						});
					});
		  		});
			} else {
				res.send(404);
			}
		} else if (pathArray[1] == "deleteEmail") {
			if(req.body.email && req.body.collection) {
				DB[req.body.collection].find({"emails.email":req.body.email}).toArray(function(e, results){
					if (results) {
						results.forEach(function(result,index,theArray){
							console.dir(result.emails.length);
							console.dir(result.emails);
							for(var a=result.emails.length-1;a>=0;a--){
								if (result.emails[a].email==req.body.email && result.emails[a].primary!=1) result.emails.splice(a,a);
							}
							console.dir(result.emails.length);
							if (index==theArray.length-1) {
								DB[req.body.collection].save(result, {safe:true}, function(e, success) {
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
			if(req.body.email && req.body.collection && req.body.doc_id) {
				DB[req.body.collection].find({"emails.email":req.body.email,"_id":new ObjectID(req.body.doc_id)}).toArray(function(e, results){
					if (results) {
						results.forEach(function(result,index,theArray){
							console.dir(result.emails.length);
							console.dir(result.emails);
							var newMails = [];
							for(var a=0;a<result.emails.length;a++){
								if (result.emails[a].email==req.body.email) {
									 result.emails[a].primary = 1;
									 newMails.push(result.emails[a]);
								} else {
									 result.emails[a].primary = 0;
								}
							}
							for(var a=0;a<result.emails.length;a++){
								if (result.emails[a].email!=req.body.email) {
									 newMails.push(result.emails[a]);
								}
							}
							result.emails = newMails;
							console.dir(result.emails.length);
							if (index==theArray.length-1) {
								DB[req.body.collection].save(result, {safe:true}, function(e, success) {
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
			if(req.body.email && req.body.newsletters && req.body.doc_id) {
				var CS = new createsend('a1df774dbf1832f1e4177589d54ef8eb');
				CS.subscriberDetails("ec6de6ef7a4a0cf81d73e0263d8017f2", req.body.email, function (e,o) {
					console.dir("bella");
					console.dir(o);
					var add = 1;
					for(var a=o.CustomFields.length-1;a>=0;a--){
						console.dir(a+" "+o.CustomFields[a].Key);
						if (o.CustomFields[a].Key=="topic" || o.CustomFields[a].Key=="flxer_id" || o.CustomFields[a].Key=="lang") o.CustomFields.splice(a,a);
					}
					console.dir(o);
					var topics = req.body.newsletters.split(",");
					for(item in topics) {
						if (topics[item]) o.CustomFields.push({"Key": "topic","Value":topics[item]});
					}
					o.CustomFields.push({"Key": "flxer_id","Value":req.body.doc_id});
					o.CustomFields.push({"Key": "lang","Value":req.body.lang.toUpperCase()});
					console.dir(o);
					CS.subscriberUpdate("ec6de6ef7a4a0cf81d73e0263d8017f2", req.body.email, o, function (e,o) {
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
