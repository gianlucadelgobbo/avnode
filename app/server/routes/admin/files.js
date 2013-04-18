var DB = require('../../modules/db-manager');
/*
var Fnc = require('../../modules/functions');
var CT = require('../../modules/country-list');
var ObjectID = require('mongodb').ObjectID;
var CT = require('../../modules/country-list');
var util = require("util");
function ins(value) { console.log(util.inspect(value, false, null)); }
*/
exports.get = function get(req, res) {
	if (req.session.user == null) {
		res.redirect('/controlpanel/login/?from='+req.url);
	} else {
		var files = {};
		DB.events.find({"files":{$exists: true}}, {fields:{_id:1,title:1,permalink:1,"users.display_name":1,files:1}}).toArray(function(err, results) {
			files.events = results;
			DB.performances.find({"files":{$exists: true}}, {fields:{_id:1,title:1,permalink:1,"users.display_name":1,files:1}}).toArray(function(err, results) {
				files.performances = results;
				DB.playlists.find({"files":{$exists: true}}, {fields:{_id:1,title:1,permalink:1,"users.display_name":1,files:1}}).toArray(function(err, results) {
					files.playlists = results;
					DB.gallery.find({"files":{$exists: true}}, {fields:{_id:1,title:1,permalink:1,"users.display_name":1,footage:1,files:1}}).toArray(function(err, results) {
						files.gallery = results;
						DB.footage.find({"files":{$exists: true}}, {fields:{_id:1,title:1,permalink:1,"users.display_name":1,files:1}}).toArray(function(err, results) {
							files.footage = results;
							DB.tvshow.find({"files":{$exists: true}}, {fields:{_id:1,title:1,permalink:1,"users.display_name":1,files:1}}).toArray(function(err, results) {
								files.tvshow = results;
								DB.users.find({"files":{$exists: true}}, {fields:{_id:1,display_name:1,permalink:1,files:1}}).toArray(function(err, results) {
									files.users = results;
					  				res.render('_admin_files', {  locals: {files : files}, user : req.session.user });
								});
							});
						});
					});
				});
			});
		});
	}
};
