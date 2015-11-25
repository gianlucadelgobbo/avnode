var http = require('http');
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
var DB = require('../../modules/db-manager');
var functions = require('../../modules/general-functions');

exports.get = function get(req, res) {
	if (req.query.code) {
		DB.temp.findOne({code:req.query.code}, function(e, result) {
			if (result) {
				if (result.act == "password") {
					DB[result.collection].findOne({_id:new ObjectID(result.doc_id)}, function(e, result2) {
						if (result2) {
					  		for(item in result.data) {
					  			result2[item] = result.data[item];
					  		}
					  		DB[result.collection].save(result2, {safe:true}, function(e, success) {
					  			if (success) {
							  		var msg = {c:[{m:result.msg.text}]};
							  		DB.temp.remove({code:req.query.code});
					  			} else {
							  		var msg = {e:[{m:"Code is not valid or already used"}]};
					  			}
								res.render('forms/confirm', {title : result.msg.title, msg:msg, "from":req.query.from, user : req.session.passport.user });
					  		});
						} else {
							var msg = {e:[{m:"Code is not valid or already used"}]};
							res.render('forms/confirm', {title : result.msg.title, msg:msg, "from":req.query.from, user : req.session.passport.user });
						}
					});
				} else if (result.act == "newmail") {
					DB[result.collection].findOne({_id:new ObjectID(result.doc_id)}, function(e, result2) {
				  		for(item in result.data) {
					  		for(item2 in result2.emails) {
					  			if (result2.emails[item2].email == result.data[item]) {
						  			result2.emails[item2].valid = 1;
					  			}
					  		}
				  		}
				  		DB[result.collection].save(result2, {safe:true}, function(e, success) {
				  			if (success) {
						  		var msg = {c:[{m:result.msg.text}]};
						  		DB.temp.remove({code:req.query.code});
				  			} else {
						  		var msg = {e:[{m:"Code is not valid or already used"}]};
				  			}
							res.render('forms/confirm', {title : result.msg.title, msg:msg, "from":req.query.from, user : req.session.passport.user });
				  		});
					});
				} else if (result.act == "inviteMember") {
					DB[result.collection].findOne({_id:new ObjectID(result.doc_id)}, function(e, result2) {
				  		result2.members.push(result.data);
				  		DB[result.collection].save(result2, {safe:true}, function(e, success) {
				  			if (success) {
						  		var msg = {c:[{m:result.msg.text}]};
						  		DB.temp.remove({code:req.query.code});
				  			} else {
						  		var msg = {e:[{m:"Code is not valid or already used"}]};
				  			}
							DB[result.collection].findOne({_id:new ObjectID(result.data._id)}, function(e, user) {
								DB[result.collection].find({"members._id":result.data._id}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
								if (subrecords.length) user.crews = subrecords;
									DB.users.save(user, {safe:true}, function(e, success) {
										res.render('forms/confirm', {title : result.msg.title, msg:msg, "from":req.query.from, user : req.session.passport.user });
									});
								});
					  		});
				  		});
					});
				}
			} else {
				var msg = {e:[{m:"Code is not valid or already used"}]};
				res.render('forms/confirm', {title : __("Code confirm"), msg:msg, "from":req.query.from, user : req.session.passport.user });
			}
		});
	} else {
        var msg = {e:[{m:"Code is not valid or already used"}]};
        res.render('forms/confirm', {title : __("Code confirm"), msg:msg, "from":req.query.from, user : req.session.passport.user });
	}
}
