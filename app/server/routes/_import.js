//rsync -avr --progress --inplace --rsh='ssh -p22' root@dev.flxer.net:/sites/flxer/warehouse/ /development/avnode/app/public/warehouse/
//./bin/mongodump --db avnode --out /development/avnode.bck
//./bin/mongorestore --db avnode /development/avnode.bck/avnode/
// forever start -l forever.log -o out.log -e err.log  --debug -a app.js
var http = require('http');
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
var DB = require('../modules/db-manager');

exports.get = function get(req, res) {
	/*if (req.session.user == null) {
		res.redirect('/controlpanel/login');
	} else {
	*/
		if(req.query.data){
			switch(req.query.data){
				case "categories" :
					http.get({host:"flxer.net",path:"/api/chiavi/"},function(response){
						var pageData = "";
						response.setEncoding('utf8');
						response.on('data', function (chunk) {
							pageData += chunk;
						});
						if (skip==0 && DB.categories) DB.categories.remove();
						response.on('end', function(){
							var ress = JSON.parse(pageData);
							if (ress.length) {
								ress.forEach(function(item, index, theArray) {
									if (item) {
										eraseAndInsert(DB.categories,item, function(err, records) {
											if (index==ress.length-1) {
					  							res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
											}
										});
									}
								});
					  		} 
						});
					});
				break;
				case "gallery" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 20;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					if (skip==0 && DB.gallery) DB.gallery.remove();
					http.get({host:"flxer.net",path:"/api/gallery/?skip="+skip+"&limit="+limit},function(response){
						var pageData = "";
						response.setEncoding('utf8');
						response.on('data', function (chunk) {
							pageData += chunk;
						});
						response.on('end', function(){
							var ress = JSON.parse(pageData);
							if (ress.length) {
								ress.forEach(function(item, index, theArray) {
									if (item) {
										item = updateEcodeGalleryData(item);
										if (item) {
											eraseAndInsert(DB.gallery,item, function(err, records) {
												if (index==ress.length-1) {
													limit = req.query.limit ? parseInt(req.query.limit) : 20;
													skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
											  		res.render('_import', {  locals: {url : "/import/?data=gallery&skip="+skip+"&limit="+limit }, user : req.session.user });
												}
											});
										}
									} 
						  		});
					  		} else {
						  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
					  		}
						});
					});
				break;
				case "tvshow" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 20;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					if (skip==0 && DB.tvshow) DB.tvshow.remove();
					http.get({host:"flxer.net",path:"/api/tvshow/?skip="+skip+"&limit="+limit},function(response){
						var pageData = "";
						response.setEncoding('utf8');
						response.on('data', function (chunk) {
							pageData += chunk;
						});
						response.on('end', function(){
							var ress = JSON.parse(pageData);
							if (ress.length) {
								ress.forEach(function(item, index, theArray) {
									if (item) {
										item = updateEcodeTvshowData(item);
										if (item) {
											eraseAndInsert(DB.tvshow,item, function(err, records) {
												if (index==ress.length-1) {
													limit = req.query.limit ? parseInt(req.query.limit) : 20;
													skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
											  		res.render('_import', {  locals: {url : "/import/?data=tvshow&skip="+skip+"&limit="+limit }, user : req.session.user });
												}
											});
										}
									} 
						  		});
					  		} else {
						  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
					  		}
						});
					});
				break;
				case "events" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 2;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					if (skip==0 && DB.events) DB.events.remove();
					http.get({host:"flxer.net",path:"/api/events/?skip="+skip+"&limit="+limit},function(response){
						var pageData = "";
						response.setEncoding('utf8');
						response.on('data', function (chunk) {
							pageData += chunk;
						});
						response.on('end', function(){
							var ress = JSON.parse(pageData);
							if (ress.length) {
								ress.forEach(function(item, index, theArray) {
									if (item) {
										item = updateEcodeEventsData(item);
										if (item) {
											eraseAndInsert(DB.events,item, function(err, records) {
												if (index==ress.length-1) {
													limit = req.query.limit ? parseInt(req.query.limit) : 2;
													skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
											  		res.render('_import', {  locals: {url : "/import/?data=events&skip="+skip+"&limit="+limit }, user : req.session.user });
												}
											});
										}
									} 
						  		});
					  		} else {
						  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
					  		}
						});
					});
				break;
				case "performances" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 20;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					if (skip==0 && DB.performances) DB.performances.remove();
					http.get({host:"flxer.net",path:"/api/performances/?skip="+skip+"&limit="+limit},function(response){
						var pageData = "";
						response.setEncoding('utf8');
						response.on('data', function (chunk) {
							pageData += chunk;
						});
						response.on('end', function(){
							var ress = JSON.parse(pageData);
							if (ress.length) {
								ress.forEach(function(item, index, theArray) {
									if (item) {
										item = updateEcodePerformancesData(item);
										if (item) {
											eraseAndInsert(DB.performances,item, function(err, records) {
												if (index==ress.length-1) {
													limit = req.query.limit ? parseInt(req.query.limit) : 20;
													skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
											  		res.render('_import', {  locals: {url : "/import/?data=performances&skip="+skip+"&limit="+limit }, user : req.session.user });
												}
											});
										}
									} 
						  		});
					  		} else {
						  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
					  		}
						});
					});
				break;
				case "playlists" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 20;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					if (skip==0 && DB.playlists) DB.playlists.remove();
					http.get({host:"flxer.net",path:"/api/playlists/?skip="+skip+"&limit="+limit},function(response){
						var pageData = "";
						response.setEncoding('utf8');
						response.on('data', function (chunk) {
							pageData += chunk;
						});
						response.on('end', function(){
							var ress = JSON.parse(pageData);
							if (ress.length) {
								ress.forEach(function(item, index, theArray) {
									if (item) {
										item = updateEcodePlaylistsData(item);
										if (item) {
											eraseAndInsert(DB.playlists,item, function(err, records) {
												if (index==ress.length-1) {
													limit = req.query.limit ? parseInt(req.query.limit) : 20;
													skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
											  		res.render('_import', {  locals: {url : "/import/?data=playlists&skip="+skip+"&limit="+limit }, user : req.session.user });
												}
											});
										}
									} 
						  		});
					  		} else {
						  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
					  		}
						});
					});
				break;
				case "footage" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 20;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					if (skip==0 && DB.footage) DB.footage.remove();
					http.get({host:"flxer.net",path:"/api/footage/?skip="+skip+"&limit="+limit},function(response){
						var pageData = "";
						response.setEncoding('utf8');
						response.on('data', function (chunk) {
							pageData += chunk;
						});
						response.on('end', function(){
							var ress = JSON.parse(pageData);
							if (ress.length) {
								ress.forEach(function(item, index, theArray) {
								//for(var a=0;a<ress.length;a++) {
									if (item) {
										item = updateEcodeFootageData(item);
										if (item) {
											eraseAndInsert(DB.footage,item, function(err, records) {
												if (index==ress.length-1) {
													limit = req.query.limit ? parseInt(req.query.limit) : 20;
													skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
											  		res.render('_import', {  locals: {url : "/import/?data=footage&skip="+skip+"&limit="+limit }, user : req.session.user });
												}
											});
										}
									} 
						  		});
					  		} else {
						  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
					  		}
						});
					});
				break;
				case "users" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 20;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					if (skip==0 && DB.users) DB.users.remove();
					http.get({host:"flxer.net",path:"/api/users/?skip="+skip+"&limit="+limit},function(response){
						var pageData = "";
						response.setEncoding('utf8');
						response.on('data', function (chunk) {
							pageData += chunk;
						});
						response.on('end', function(){
							var ress = JSON.parse(pageData);
							if (ress.length) {
								ress.forEach(function(item, index, theArray) {
									if (item) {
										item = updateEcodeUsersData(item);
										if (item) {
											eraseAndInsert(DB.users,item, function(err, records) {
												if (index==ress.length-1) {
													limit = req.query.limit ? parseInt(req.query.limit) : 20;
													skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
											  		res.render('_import', {  locals: {url : "/import/?data=users&skip="+skip+"&limit="+limit }, user : req.session.user });
												}
											});
										}
									} 
								});
					  		} else {
						  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
					  		}
						});
					});
				break;
				case "categories_permalink" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.categories.find({"slug":{$exists: true}}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								item = updateEcodeCategoriesData(item);
								DB.categories.findOne({old_id: item.old_id},function(err, record){
									DB.categories.save(item, {safe: true}, function(err, recordIns){
										if (index==records.length-1) {
											res.render('_import', {  locals: {url : "/import/?data=categories_rel"}, user : req.session.user });
										}
									});
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "categories_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.categories.find({"ancestors":{$exists: false}}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updateCategories(item, function() {
									if (index==records.length-1) {
										res.render('_import', {  locals: {url : "/import/?data=categories_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "users_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.users.find({"avatar":{$exists: true}}, {skip:skip, limit:limit}).toArray(function(err, records){
					//DB.users.find({}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updateUser(item, function() {
									if (index==records.length-1) {
										res.render('_import', {  locals: {url : "/import/?data=users_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "crews_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.users.find({"members.name":{$exists: true},"is_crew":1}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updateCrew(item, function() {
									if (index==records.length-1) {
										res.render('_import', {  locals: {url : "/import/?data=crews_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "users_crews_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.users.find({"crews.members.name":{$exists: true},"is_crew":0}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updateUserCrew(item, function() {
									if (index==records.length-1) {
										res.render('_import', {  locals: {url : "/import/?data=users_crews_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "footage_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.footage.find({"users.permalink":{$exists:false}}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updateFootage(item, function() {
									if (index==records.length-1) {
										/*
										limit = req.query.limit ? parseInt(req.query.limit) : 100;
										skip = req.query.skip ? parseInt(req.query.skip)+limit : 100;
										res.render('_import', {  locals: {url : "/import/?data=footage_rel&skip="+skip+"&limit="+limit}, user : req.session.user });
										*/
										res.render('_import', {  locals: {url : "/import/?data=footage_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "playlists_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.playlists.find({"users.permalink":{$exists:false}}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updatePlaylists(item, function() {
									if (index==records.length-1) {
										/*
										limit = req.query.limit ? parseInt(req.query.limit) : 100;
										skip = req.query.skip ? parseInt(req.query.skip)+limit : 100;
										res.render('_import', {  locals: {url : "/import/?data=playlists_rel&skip="+skip+"&limit="+limit}, user : req.session.user });
										*/
										res.render('_import', {  locals: {url : "/import/?data=playlists_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "performances_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.performances.find({"users.permalink":{$exists:false}}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updatePerformances(item, function() {
									if (index==records.length-1) {
										limit = req.query.limit ? parseInt(req.query.limit) : 100;
										skip = req.query.skip ? parseInt(req.query.skip)+limit : 0;
										res.render('_import', {  locals: {url : "/import/?data=performances_rel&skip="+skip+"&limit="+limit}, user : req.session.user });
										/*
										limit = req.query.limit ? parseInt(req.query.limit) : 100;
										skip = req.query.skip ? parseInt(req.query.skip)+limit : 100;
										res.render('_import', {  locals: {url : "/import/?data=performances_rel&skip="+skip+"&limit="+limit}, user : req.session.user });
										*/
										res.render('_import', {  locals: {url : "/import/?data=performances_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "events_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.events.find({"users.permalink":{$exists:false}}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updateEvents(item, function() {
									if (index==records.length-1) {
										/*
										limit = req.query.limit ? parseInt(req.query.limit) : 100;
										skip = req.query.skip ? parseInt(req.query.skip)+limit : 100;
										res.render('_import', {  locals: {url : "/import/?data=events_rel&skip="+skip+"&limit="+limit}, user : req.session.user });
										*/
										res.render('_import', {  locals: {url : "/import/?data=events_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "gallery_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.gallery.find({"users.permalink":{$exists:false}}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updateGallery(item, function() {
									if (index==records.length-1) {
										/*
										limit = req.query.limit ? parseInt(req.query.limit) : 100;
										skip = req.query.skip ? parseInt(req.query.skip)+limit : 100;
										res.render('_import', {  locals: {url : "/import/?data=gallery_rel&skip="+skip+"&limit="+limit}, user : req.session.user });
										*/
										res.render('_import', {  locals: {url : "/import/?data=gallery_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
				case "tvshow_rel" :
					var limit = req.query.limit ? parseInt(req.query.limit) : 100;
					var skip = req.query.skip ? parseInt(req.query.skip) : 0;
					DB.tvshow.find({"users.permalink":{$exists:false}}, {skip:skip, limit:limit}).toArray(function(err, records){
						if (records.length) {
							records.forEach(function(item, index, theArray) {
								updateTvshow(item, function() {
									if (index==records.length-1) {
										//limit = req.query.limit ? parseInt(req.query.limit) : 100;
										//skip = req.query.skip ? parseInt(req.query.skip)+limit : 100;
										//res.render('_import', {  locals: {url : "/import/?data=tvshow_rel&skip="+skip+"&limit="+limit}, user : req.session.user });
										res.render('_import', {  locals: {url : "/import/?data=tvshow_rel"}, user : req.session.user });
									}
								});
							});
				  		} else {
					  		res.render('_import', {  locals: {msg : "DONE"}, user : req.session.user });
				  		}
					});
				break;
			}
		} else {
			res.render('_import', {  locals: {menu : true}, user : req.session.user });
		}
	//}
};
function eraseAndInsert(table,obj,callback) {
	table.remove({old_id: obj.old_id}, {safe:true}, function(err, records){
		table.insert(obj, {safe: true}, function(err, records){
			callback(err, records);
		});
	});
}
function eraseAndInsertChiavi(table,obj,callback) {
	table.remove({old_id: obj.old_id}, {safe:true}, function(err, records){
		table.findOne({old_id: obj.ancestor_old_id}, function(err, record){
			console.dir("bella");
			console.dir(obj);
			obj.ancestors = (record ? [{_id:record._id}] : []);
			//delete obj.ancestor_old_id;
			console.dir(obj);
			table.insert(obj, {safe: true}, function(err, recordIns){
				console.dir(recordIns);
				//callback(err, records);
			});
		});
	});
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function updateCategories(category,callback) {
	DB.categories.find({old_id: category.ancestor_old_id}).toArray(function(err, records){
		category.ancestors = records;
		DB.categories.save(category, {safe: true}, function(err, recordIns){
			callback(err, records);
		});
	});
}
function updateUser(user,callback) {
	if(user.avatar) {
		if(!(user.avatar.substring(user.avatar.length-15,user.avatar.length)=="defaultUser.gif")){
			user.files = [{
				file:	updateFiles(user.avatar,"90x68/")
			}];
		}
		delete user.avatar;
	}
	var myids = [user.old_id];
	for(item in user.crews) {
		myids.push(user.crews[item].old_id);
	}
	console.dir(myids);
	DB.footage.find({"users.old_id":{$in:myids}}, {fields:{_id:1,title:1,permalink:1,users:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) user.footage = subrecords;
		DB.playlists.find({"users.old_id":{$in:myids}}, {fields:{_id:1,title:1,permalink:1,users:1,files:1,stats:1}}).toArray(function(err, subrecords){
			if (subrecords.length) user.playlists = subrecords;
			DB.performances.find({"users.old_id":{$in:myids}}, {fields:{_id:1,title:1,permalink:1,users:1,files:1,categories:1,stats:1}}).toArray(function(err, subrecords){
				if (subrecords.length) user.performances = subrecords;
				DB.events.find({"users.old_id":{$in:myids}}, {fields:{_id:1,title:1,permalink:1,users:1,files:1,categories:1,stats:1}}).toArray(function(err, subrecords){
					if (subrecords.length) user.events = subrecords;
					DB.tvshow.find({"users.old_id":{$in:myids}}, {fields:{_id:1,title:1,permalink:1,users:1,files:1,categories:1,stats:1}}).toArray(function(err, subrecords){
						if (subrecords.length) user.tvshow = subrecords;
						DB.gallery.find({"users.old_id":{$in:myids}}, {fields:{_id:1,title:1,permalink:1,users:1,files:1,stats:1}}).toArray(function(err, subrecords){
							if (subrecords.length) user.gallery = subrecords;
							DB.categories.find({"old_id":{$in:user.categories}}, {fields:{_id:1,name:1,slug:1,ancestors:1}}).toArray(function(err, subrecords){
								if (subrecords.length) user.categories = subrecords;
								DB.users.save(user);
								DB.users.findOne({_id:user._id},function(err, record){
									console.dir(record);
									callback();
								});
							});
						});
					});
				});
			});
		});
	});
}
function updateCrew(user,callback) {
	var oldids = [];
	for(item in user.members) {
		oldids.push(user.members[item].old_id);
	}
	DB.users.find({"old_id":{$in: oldids }}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		delete user.members;
		if (subrecords.length) user.members = subrecords;
		DB.users.save(user);
		DB.users.findOne({_id:user._id},function(err, record){
			callback();
			//console.dir(record);
		});
	});
}
function updateUserCrew(user,callback) {
	console.dir({"members.old_id":user.old_id});
	DB.users.find({"members.old_id":user.old_id}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		delete user.crews;
		if (subrecords.length) user.crews = subrecords;
		DB.users.save(user);
		DB.users.findOne({_id:user._id},function(err, record){
			callback();
			//console.dir(record);
		});
	});
}
function updateFootage(obj,callback) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		DB.footage.save(obj);
		DB.footage.findOne({_id:obj._id},function(err, record){
			callback();
			console.dir(record);
		});
	});
}
function updateTvshow(obj,callback) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		DB.categories.find({"old_id":{$in:obj.categories}}, {fields:{_id:1,name:1,slug:1,ancestors:1}}).toArray(function(err, subrecords){
			if (subrecords.length) obj.categories = subrecords;
			DB.tvshow.save(obj);
			DB.tvshow.findOne({_id:obj._id},function(err, record){
				callback();
				console.dir(record);
			});
		});
	});
}
function updatePlaylists(obj,callback) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	var footage = [];
	for(item in obj.footage) {
		footage.push(obj.footage[item].old_id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		//console.dir(footage);
		DB.footage.find({"old_id":{$in:footage}}, {fields:{_id:1,title:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
			if (subrecords.length) obj.footage = subrecords;
			DB.playlists.save(obj);
			DB.playlists.findOne({_id:obj._id},function(err, record){
				callback();
			});
		});
	});
}
function updateGallery(obj,callback) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		DB.gallery.save(obj);
		DB.gallery.findOne({_id:obj._id},function(err, record){
			callback();
		});
	});
}
function updatePerformances(obj,callback) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	var gallery = [];
	for(item in obj.gallery) {
		gallery.push(obj.gallery[item].id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1,members:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		DB.gallery.find({"old_id":{$in:gallery}}, {fields:{_id:1,title:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
			if (subrecords.length) obj.gallery = subrecords;
			DB.categories.find({"old_id":{$in:obj.categories}}, {fields:{_id:1,name:1,slug:1,ancestors:1}}).toArray(function(err, subrecords){
				if (subrecords.length) obj.categories = subrecords;
				//console.dir(obj);
				DB.performances.save(obj);
				DB.performances.findOne({_id:obj._id},function(err, record){
					callback();
				});
			});
		});
	});
}
function updateEvents(obj,callback) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	var partners = {};
	var partnersIndex = [];
	if (obj.partners) {
		for(i in obj.partners){
			if (!partners[i]) {
				partnersIndex.push(i);
				partners[i] = [];
			}
			for(item in obj.partners[i]) {
				partners[i].push(obj.partners[i][item].uid);
			}
		}
	}
	var gallery = [];
	for(item in obj.gallery) {
		gallery.push(obj.gallery[item].id);
	}
	var performances = {};
	var performancesMeta = {};
	var performancesIndex = [];
	if (obj.performances) {
		for(i in obj.performances){
			if (!performances[i]) {
				performancesIndex.push(i);
				performances[i] = [];
			}
			for(item in obj.performances[i]) {
				performancesMeta[obj.performances[i][item].id] = {
					"rel_chiavi" : 	obj.performances[i][item].rel_chiavi,
					"data_i" : 		obj.performances[i][item].data_i,
					"data_f" : 		obj.performances[i][item].data_f,
					"ora_i" : 		obj.performances[i][item].ora_i,
					"ora_f" : 		obj.performances[i][item].ora_f,
					"rel_id" : 		obj.performances[i][item].rel_id,
					"user_id" : 	obj.performances[i][item].user_id,
					"confirm" : 	obj.performances[i][item].confirm,
					"room" : 		obj.performances[i][item].room
									
				}
				//console.dir(obj.performances[i][item]);
				performances[i].push(obj.performances[i][item].id);
			}
		}
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1,members:1}}).toArray(function(err, subrecords){
		if (subrecords.length) {
			var administrator = subrecords[0].is_crew ? subrecords[0].members[0] : subrecords[0];
			obj.settings.permissions = {administrator:[administrator]};
			obj.users = subrecords;
		}
		DB.gallery.find({"old_id":{$in:gallery}}, {fields:{_id:1,old_id:1,title:1,permalink:1,files:1,stats:1,users:1}}).toArray(function(err, subrecords){
			if (subrecords.length) obj.gallery = subrecords;
			DB.categories.find({"old_id":{$in:obj.categories}}, {fields:{_id:1,name:1,slug:1,ancestors:1}}).toArray(function(err, subrecords){
				if (subrecords) obj.categories = subrecords;
				if (partnersIndex.length) {
					console.dir("bb");
					console.dir(partnersIndex);
					var conta = 0;
					partnersIndex.forEach(function(item, index) {
						DB.users.find({"old_id":{$in:partners[item]}}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
							conta++;
							if (subrecords.length) obj.partners[item] = subrecords;
							if (partnersIndex.length==conta) {
								var conta2 = 0;
								performancesIndex.forEach(function(item, index, theArray) {
									DB.performances.find({"old_id":{$in:performances[item]}}, {fields:{_id:1,old_id:1,title:1,permalink:1,files:1,stats:1,users:1,categories:1,old_id:1,duration:1}}).toArray(function(err, subrecords){
										conta2++;
											console.dir("aaaaaaaa");
											console.dir(item);
											console.dir(performances[item]);
											console.dir(subrecords);
										if (subrecords.length) {
											for (subrecord in subrecords) subrecords[subrecord].event_data = performancesMeta[subrecords[subrecord].old_id];
											obj.performances[item] = subrecords;
										}
										if (performancesIndex.length==conta2) {
											DB.events.save(obj);
											console.dir(obj);
											DB.events.findOne({_id:obj._id},function(err, record){
												callback();
											});
										}
									});
								});
							}
						});
					});
				} else if (performancesIndex.length) {
					var conta2 = 0;
					performancesIndex.forEach(function(item, index) {
						DB.performances.find({"old_id":{$in:performances[item]}}, {fields:{_id:1,old_id:1,title:1,permalink:1,files:1,stats:1,users:1,categories:1,old_id:1}}).toArray(function(err, subrecords){
							conta2++;
							if (subrecords.length) {
								for (subrecord in subrecords) subrecords[subrecord].event_data = performancesMeta[subrecords[subrecord].old_id];
								obj.performances[item] = subrecords;
							}
							if (performancesIndex.length==conta2) {
								DB.events.save(obj.performances);
								DB.events.findOne({_id:obj._id},function(err, record){
									callback();
								});
							}
						});
					});
				} else {
					DB.events.save(obj);
					DB.events.findOne({_id:obj._id},function(err, record){
						callback();
					});
				}
			});
		});
	});
}



function updateEcodeUsersData(data) {
	data.old_id = data.uid;
	delete data.uid;
	data.is_crew = parseFloat(data.is_crew);
	
	if(!data.stats) data.stats = {
		members: 0,
		performances: 0,
		crews: 0,
		crewperformance: 0,
		post: 0,
		tvshows: 0,
		playlists: 0,
		progetti: 0,
		gallery: 0,
		iflxerpost: 0,
		iflxerplaylists: 0,
		forum: 0,
		friends: 0
	};
	data.activity = ((data.stats["performances"]*2)+(data.stats["post"]/5)+data.stats["tvshows"]+data.stats["playlists"]+data.stats["progetti"]+data.stats["gallery"]+(data.stats["iflxerpost"]/5)+(data.stats["iflxerplaylists"]/5)+data.stats["forum"]);


	if (data.is_crew==0) data.name = data.nome;
	delete data.nome;

	if (data.is_crew==0) data.surname = data.cognome;
	delete data.cognome;

	data.permalink = data.login;
	if (data.is_crew==1) delete data.login;

	data.display_name = data.nomearte;
	delete data.nomearte;

	delete data.titolo;
	
	if (data.is_crew==0) data.gender = data.sesso;
	delete data.sesso;

	if (data.is_crew==0) data.lang = data.lingua;
	delete data.lingua;
	if (!data.lang) data.lang = 1;

	data.public = 1;
	
	if (data.is_crew==0) data.birth_date = new Date(data.dataSogg);
	delete data.dataSogg;

	data.text = data.testo;
	delete data.testo;

	if (data.is_crew==0) delete data.members;
	if (data.is_crew==1) {
		delete data.crews;
		delete data.emails;
		delete data.lang;
	} else {
		if (data.crews) {
			for(var a=0;a<data.crews.length;a++){
				data.crews[a] = updateEcodeUsersData(data.crews[a]);
			}
		} else {
			delete data.crews;
		}
	}
	if (data.is_crew==0) {
		delete data.members;
	} else {
		if (data.members) {
			for(var a=0;a<data.members.length;a++){
				data.members[a] = updateEcodeUsersData(data.members[a]);
			}
		} else {
			delete data.members;
		}
	}
	delete data.performances;
	delete data.crewperformance;
	delete data.post;
	delete data.tvshows;
	delete data.playlists;
	delete data.progetti;
	delete data.gallery;
	delete data.iflxerpost;
	delete data.iflxerplaylists;
	delete data.forum;
	delete data.friends;
	delete data.dataIscr;
	delete data.confirmed;

	data.categories = [];
	if (data.chiavi) {
		cat = data.chiavi.split(",");
		for (item in cat) {
			cat2 = cat[item].split("|");
			if (cat2.length>3) {
				data.categories.push(cat2[2]);
			} else {
				data.categories.push(cat2[1]);
			}
		}
	}
	delete data.chiavi;

	data.creation_date = new Date(parseInt(data.dataIscrInt)*1000);
	delete data.dataIscrInt;

	return data;
}

function updateEcodeCategoriesData(data) {
	data.permalink = data.slug;
	delete data.slug;
	return data;
}

function updateEcodeFootageData(data) {
	data.old_id = data.id;
	delete data.id;
	if(data.file_info) {
		//console.dir(data.file_info);
		data.files = [{
			file:		"/"+data.file_info.cartella+"/"+data.file_info.nome,
			encoded:	parseInt(data.encoded)
		}];
		if(!(data.img_arr.substring(data.img_arr.length-11,data.img_arr.length)=="default.gif")) {
			data.files[0].preview = updateFiles(data.img_arr,"90x68/")
		}
		delete data.img_arr;
		delete data.encoded;
		delete data.file_info;
	
	}
	data.users = [{
		old_id:			data.uid,
		permalink:		data.login,
		display_name:	data.nomearte
	}];
	delete data.uid;
	delete data.login;
	delete data.nomearte;
	data.stats = {
		visits:			data.visite,
		downloads:		data.download,
		rates:			data.rateArr
	};
	delete data.visite;
	delete data.download;
	delete data.rateArr;

	delete data.avatar;
	delete data.chiavi;
	delete data.forum;
	delete data.nazione;
	delete data.lingua;
	delete data.totimg;
	delete data.luoghi;
	delete data.tipo;
	
	data.title = data.titolo;
	delete data.titolo;

	data.text = data.testo;
	delete data.testo;

	data.creation_date = new Date(data.data_creazione);
	delete data.data_creazione;

	delete data.postdata;
	delete data.postdatadiff;

	return data;
}
function updateEcodePlaylistsData(data) {
	data.old_id = data.id;
	delete data.id;
	if(data.img_arr) {
		if(!(data.img_arr.substring(data.img_arr.length-11,data.img_arr.length)=="default.gif")){
			data.files = [{
				file:	updateFiles(data.img_arr,"400x300/")
			}];
		}
		delete data.img_arr;
	}
	if(data.footage) {
		for(var a=0;a<data.footage.length;a++){
			data.footage[a].old_id = data.footage[a].id_rel;
			delete data.footage[a].id_rel;
		}
	}
	data.users = [{
		old_id:			data.uid,
		permalink:		data.login,
		display_name:	data.nomearte
	}];
	delete data.uid;
	delete data.login;
	delete data.nomearte;
	data.stats = {
		visits:			data.visite,
		downloads:		data.download,
		rates:			data.rateArr
	};
	delete data.visite;
	delete data.download;
	delete data.rateArr;

	delete data.tot_footage;
	data.title = data.titolo2;
	delete data.titolo2;
	delete data.titolo;
	delete data.chiavi;
	delete data.avatar;

	delete data.testo;

	data.creation_date = new Date(data.data_creazione);
	delete data.data_creazione;

	delete data.postdata;
	delete data.postdatadiff;

	return data;
}
function updateEcodePerformancesData(data) {
	data.old_id = data.id;
	delete data.id;

	data.title = data.titolo;
	delete data.titolo;

	data.text = data.testo;
	delete data.testo;

	if(data.img_arr) {
		if(!(data.img_arr.substring(data.img_arr.length-11,data.img_arr.length)=="default.gif")){
			data.files = [{
				file:	updateFiles(data.img_arr,"400x300/")
			}];
		}
		delete data.img_arr;
	}
	data.users = [];
	if (data.performers) {
		for(var a=0;a<data.performers.length;a++){
			data.users.push({old_id:data.performers[a].uid});
		}
	}
	delete data.performers;

	data.categories = [];
	if (data.chiavi) {
		cat = data.chiavi.split(",");
		for (item in cat) {
			cat2 = cat[item].split("|");
			if (cat2.length>3) {
				data.categories.push(cat2[2]);
			} else {
				data.categories.push(cat2[1]);
			}
		}
	}
	delete data.chiavi;
	delete data.type;
	delete data.typeStr;
	delete data.typePermalink;
	delete data.technique381;
	delete data.technique382;
	delete data.genre;
	delete data.tag;
	delete data.paypal;

	data.stats = {
		visits:			data.visite,
		rates:			data.rateArr
	};
	delete data.visite;
	delete data.rateArr;

	data.creation_date = new Date(data.data_creazione);
	delete data.data_creazione;

	delete data.postdata;
	delete data.postdatadiff;

	return data;
}
function updateEcodeEventsData(data) {
	data.old_id = data.id;
	delete data.id;

	data.title = data.titolo;
	delete data.titolo;

	data.subtitle = data.sottotitolo;
	delete data.sottotitolo;
	delete data.salabase;
	delete data.eventodata;

	data.text = data.testo;
	delete data.testo;

	if(data.img_arr) {
		if(!(data.img_arr.substring(data.img_arr.length-11,data.img_arr.length)=="default.gif")){
			data.files = [{
				file:	updateFiles(data.img_arr,"400x300/")
			}];
		}
		delete data.img_arr;
	}
	data.users = [];
	if (data.performers) {
		for(var a=0;a<data.performers.length;a++){
			data.users.push({old_id:data.performers[a].uid});
		}
	}
	delete data.performers;

	data.date_time_venue = [];
	if (data.dataluogo) {
		for(var a=0;a<data.dataluogo.length;a++){
			data.date_time_venue.push({ date:data.dataluogo[a].data_evento , venue:data.dataluogo[a].luogo , start_time:data.dataluogo[a].ora_inizio , end_time:data.dataluogo[a].ora_fine , city:data.dataluogo[a].citta, country:data.dataluogo[a].nazione});
		}
	}
	delete data.dataluogo;
	
	data.settings = {
		is_public: data.public,
		gallery_is_public: data.publicGall,
		call: {
			is_active: data.callOpen,
			program_builder: data.callOpen,
			advanced_proposals_manager: data.callOpen
		}
	};
	delete data.public;
	delete data.publicGall;
	delete data.callOpen;

	data.categories = [];
	if (data.chiavi) {
		cat = data.chiavi.split(",");
		for (item in cat) {
			if (cat[item]) {
				cat2 = cat[item].split("|");
				if (cat2.length>3) {
					data.categories.push(cat2[2]);
				} else {
					data.categories.push(cat2[1]);
				}
			}
		}
	}
	delete data.chiavi;
	delete data.type;
	delete data.typeStr;
	delete data.typePermalink;
	delete data.technique381;
	delete data.technique382;
	delete data.genre;
	delete data.tag;
	delete data.paypal;

	data.stats = {
		visits:			data.visite,
		rates:			data.rateArr
	};
	delete data.visite;
	delete data.rateArr;

	data.creation_date = new Date(data.data_creazione);
	delete data.data_creazione;

	delete data.postdata;
	delete data.postdatadiff;

	return data;
}
function updateEcodeTvshowData(data) {
	data.old_id = data.id;
	delete data.id;

	data.title = data.titolo;
	delete data.titolo;

	data.subtitle = data.sottotitolo;
	delete data.sottotitolo;

	data.text = data.testo;
	delete data.testo;

	if(data.img_arr) {
		if(!(data.img_arr.substring(data.img_arr.length-11,data.img_arr.length)=="default.gif")){
			data.files = [{
				preview:	updateFiles(data.img_arr,"90x68/"),
				preview2:	"/"+data.preview_file,
				file:		data.file
			}];
		}
		delete data.img_arr;
		delete data.preview_file;
		delete data.file;
	
	}
	data.users = [];
	if (data.performers) {
		for(var a=0;a<data.performers.length;a++){
			data.users.push({old_id:data.performers[a].uid});
		}
	}
	delete data.performers;

	data.categories = [];
	if (data.chiavi) {
		cat = data.chiavi.split(",");
		for (item in cat) {
			if (cat[item]) {
				cat2 = cat[item].split("|");
				if (cat2.length>3) {
					data.categories.push(cat2[2]);
				} else {
					data.categories.push(cat2[1]);
				}
			}
		}
	}
	delete data.chiavi;
	delete data.type;
	delete data.typeStr;
	delete data.typePermalink;
	delete data.technique381;
	delete data.technique382;
	delete data.genre;
	delete data.tag;
	delete data.paypal;

	data.stats = {
		visits:			data.visite,
		rates:			data.rateArr
	};
	delete data.visite;
	delete data.rateArr;

	data.creation_date = new Date(data.data_creazione);
	delete data.data_creazione;

	delete data.postdata;
	delete data.postdatadiff;

	return data;
}
function updateEcodeGalleryData(data) {
	data.old_id = data.id;
	delete data.id;

	data.title = data.titolo;
	delete data.titolo;

	if(data.img_arr) {
		if(!(data.img_arr.substring(data.img_arr.length-11,data.img_arr.length)=="default.gif")){
			data.files = [{
				file:	updateFiles(data.img_arr,"400x300")
			}];
		}
		delete data.img_arr;
	}
	data.users = [];
	if (data.performers) {
		for(var a=0;a<data.performers.length;a++){
			data.users.push({old_id:data.performers[a].uid});
		}
	}
	delete data.performers;

	delete data.audio;
	delete data.video;
	delete data.photo;
	delete data.tobeencoded;
	delete data.encodingfailed;

	data.events = data.eventi;
	delete data.eventi;

	data.stats.visits = data.visite;
	delete data.visite;
	
	data.creation_date = new Date(data.data_creazione);
	delete data.data_creazione;

	data.footage = data.sorted;
	delete data.sorted;

	delete data.postdata;
	delete data.postdatadiff;

	return data;
}
function updateCrewsMembers(data) {
}
function updateFiles(file,size){
	var newFile = file.replace(size,"");
	return newFile.substring(0,newFile.lastIndexOf('_')).concat('.',newFile.substring(newFile.lastIndexOf('_')+1,newFile.lastIndexOf('.')));
}

