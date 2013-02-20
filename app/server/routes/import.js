var http = require('http');
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
var DB = require('../modules/db-manager');

exports.get = function get(req, res) {
	if(req.query.data){
		switch(req.query.data){
			case "categories" :
				http.get({host:"flxer.net",path:"/api/chiavi/"},function(response){
					var pageData = "";
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						pageData += chunk;
					});
					response.on('end', function(){
						var ress = JSON.parse(pageData);
						if (ress.length) {
							for(var a=0;a<ress.length;a++) {
								if (ress[a]) {
									if (ress[a]) {
										//console.dir(ress[a]);
										eraseAndInsertChiavi(DB.categories,ress[a]);
									}
								}
							}
					  		res.render('import', {  locals: {msg : "DONE"} });
				  		} 
					});
				});
			break;
			case "gallery" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				//if (skip==0 && DB.gallery) DB.gallery.remove();
				http.get({host:"flxer.net",path:"/api/gallery/?skip="+skip+"&limit="+limit},function(response){
					var pageData = "";
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						pageData += chunk;
					});
					response.on('end', function(){
						var ress = JSON.parse(pageData);
						if (ress.length) {
							for(var a=0;a<ress.length;a++) {
								if (ress[a]) {
									ress[a] = updateEcodeGalleryData(ress[a]);
									if (ress[a]) {
										//console.dir(ress[a]);
										eraseAndInsert(DB.gallery,ress[a]);
									}
								} 
					  		}
							limit = req.query.limit ? parseInt(req.query.limit) : 2;
							skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
					  		res.render('import', {  locals: {url : "/import/?data=gallery&skip="+skip+"&limit="+limit } });
				  		} else {
					  		res.render('import', {  locals: {msg : "DONE"} });
				  		}
					});
				});
			break;
			case "tvshow" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				//if (skip==0 && DB.tvshow) DB.tvshow.remove();
				http.get({host:"flxer.net",path:"/api/tvshow/?skip="+skip+"&limit="+limit},function(response){
					var pageData = "";
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						pageData += chunk;
					});
					response.on('end', function(){
						var ress = JSON.parse(pageData);
						if (ress.length) {
							for(var a=0;a<ress.length;a++) {
								if (ress[a]) {
									ress[a] = updateEcodeTvshowData(ress[a]);
									if (ress[a]) {
										//console.dir(ress[a]);
										eraseAndInsert(DB.tvshow,ress[a]);
									}
								} 
					  		}
							limit = req.query.limit ? parseInt(req.query.limit) : 2;
							skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
					  		res.render('import', {  locals: {url : "/import/?data=tvshow&skip="+skip+"&limit="+limit } });
				  		} else {
					  		res.render('import', {  locals: {msg : "DONE"} });
				  		}
					});
				});
			break;
			case "events" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				//if (skip==0 && DB.events) DB.events.remove();
				http.get({host:"flxer.net",path:"/api/events/?skip="+skip+"&limit="+limit},function(response){
					var pageData = "";
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						pageData += chunk;
					});
					response.on('end', function(){
						var ress = JSON.parse(pageData);
						if (ress.length) {
							for(var a=0;a<ress.length;a++) {
								if (ress[a]) {
									ress[a] = updateEcodeEventsData(ress[a]);
									if (ress[a]) {
										//console.dir(ress[a]);
										eraseAndInsert(DB.events,ress[a]);
									}
								} 
					  		}
							limit = req.query.limit ? parseInt(req.query.limit) : 2;
							skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
					  		res.render('import', {  locals: {url : "/import/?data=events&skip="+skip+"&limit="+limit } });
				  		} else {
					  		res.render('import', {  locals: {msg : "DONE"} });
				  		}
					});
				});
			break;
			case "performances" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				//if (skip==0 && DB.performances) DB.performances.remove();
				http.get({host:"flxer.net",path:"/api/performances/?skip="+skip+"&limit="+limit},function(response){
					var pageData = "";
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						pageData += chunk;
					});
					response.on('end', function(){
						var ress = JSON.parse(pageData);
						if (ress.length) {
							for(var a=0;a<ress.length;a++) {
								if (ress[a]) {
									ress[a] = updateEcodePerformancesData(ress[a]);
									if (ress[a]) {
										//console.dir(ress[a]);
										eraseAndInsert(DB.performances,ress[a]);
									}
								} 
					  		}
							limit = req.query.limit ? parseInt(req.query.limit) : 2;
							skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
					  		res.render('import', {  locals: {url : "/import/?data=performances&skip="+skip+"&limit="+limit } });
				  		} else {
					  		res.render('import', {  locals: {msg : "DONE"} });
				  		}
					});
				});
			break;
			case "playlists" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				//if (skip==0 && DB.playlists) DB.playlists.remove();
				http.get({host:"flxer.net",path:"/api/playlists/?skip="+skip+"&limit="+limit},function(response){
					var pageData = "";
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						pageData += chunk;
					});
					response.on('end', function(){
						var ress = JSON.parse(pageData);
						if (ress.length) {
							for(var a=0;a<ress.length;a++) {
								if (ress[a]) {
									ress[a] = updateEcodePlaylistsData(ress[a]);
									if (ress[a]) {
										//console.dir(ress[a]);
										eraseAndInsert(DB.playlists,ress[a]);
									}
								} 
					  		}
							limit = req.query.limit ? parseInt(req.query.limit) : 2;
							skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
					  		res.render('import', {  locals: {url : "/import/?data=playlists&skip="+skip+"&limit="+limit } });
				  		} else {
					  		res.render('import', {  locals: {msg : "DONE"} });
				  		}
					});
				});
			break;
			case "footage" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				//if (skip==0 && DB.footage) DB.footage.remove();
				http.get({host:"flxer.net",path:"/api/footage/?skip="+skip+"&limit="+limit},function(response){
					var pageData = "";
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						pageData += chunk;
					});
					response.on('end', function(){
						var ress = JSON.parse(pageData);
						if (ress.length) {
							for(var a=0;a<ress.length;a++) {
								if (ress[a]) {
									ress[a] = updateEcodeFootageData(ress[a]);
									if (ress[a]) {
										eraseAndInsert(DB.footage,ress[a]);
									}
								} 
					  		}
							limit = req.query.limit ? parseInt(req.query.limit) : 2;
							skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
					  		res.render('import', {  locals: {url : "/import/?data=footage&skip="+skip+"&limit="+limit } });
				  		} else {
					  		res.render('import', {  locals: {msg : "DONE"} });
				  		}
					});
				});
			break;
			case "users" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				//if (skip==0 && DB.users) DB.users.remove();
				http.get({host:"flxer.net",path:"/api/users/?skip="+skip+"&limit="+limit},function(response){
					var pageData = "";
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						pageData += chunk;
					});
					response.on('end', function(){
						var ress = JSON.parse(pageData);
						if (ress.length) {
							for(var a=0;a<ress.length;a++) {
								if (ress[a]) {
									ress[a] = updateEcodeUsersData(ress[a]);
									if (ress[a]) {
										eraseAndInsert(DB.users,ress[a]);
									}
								} 
					  		}
							limit = req.query.limit ? parseInt(req.query.limit) : 2;
							skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
					  		res.render('import', {  locals: {url : "/import/?data=users&skip="+skip+"&limit="+limit } });
				  		} else {
					  		res.render('import', {  locals: {msg : "DONE"} });
				  		}
				  		//res.send(JSON.stringify(ress, null, '\t'));
				  		//res.send("/import/?data=users&skip="+skip+"&limit="+limit+"\n\n"+JSON.stringify(ress, null, '\t'));
				  		//res.end();
					});
				});
			break;
			case "users_rel" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				DB.users.find({}, {skip:skip, limit:limit}).toArray(function(err, records){
					if (records.length) {
						for(var a=0;a<records.length;a++){
							updateUser(records[a]);
						}
						limit = req.query.limit ? parseInt(req.query.limit) : 2;
						skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
						res.render('import', {  locals: {url : "/import/?data=users_rel&skip="+skip+"&limit="+limit } });
			  		} else {
				  		res.render('import', {  locals: {msg : "DONE"} });
			  		}
				});
			break;
			case "footage_rel" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				DB.footage.find({}, {skip:skip, limit:limit}).toArray(function(err, records){
					if (records.length) {
						for(var a=0;a<records.length;a++){
							updateFootage(records[a]);
						}
						limit = req.query.limit ? parseInt(req.query.limit) : 2;
						skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
						res.render('import', {  locals: {url : "/import/?data=footage_rel&skip="+skip+"&limit="+limit } });
			  		} else {
				  		res.render('import', {  locals: {msg : "DONE"} });
			  		}
				});
			break;
			case "playlists_rel" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				DB.playlists.find({}, {skip:skip, limit:limit}).toArray(function(err, records){
					if (records.length) {
						for(var a=0;a<records.length;a++){
							updatePlaylists(records[a]);
						}
						limit = req.query.limit ? parseInt(req.query.limit) : 2;
						skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
						res.render('import', {  locals: {url : "/import/?data=playlists_rel&skip="+skip+"&limit="+limit } });
			  		} else {
				  		res.render('import', {  locals: {msg : "DONE"} });
			  		}
				});
			break;
			case "performances_rel" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				DB.performances.find({}, {skip:skip, limit:limit}).toArray(function(err, records){
					if (records.length) {
						for(var a=0;a<records.length;a++){
							updatePerformances(records[a]);
						}
						limit = req.query.limit ? parseInt(req.query.limit) : 2;
						skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
						res.render('import', {  locals: {url : "/import/?data=performances_rel&skip="+skip+"&limit="+limit } });
			  		} else {
				  		res.render('import', {  locals: {msg : "DONE"} });
			  		}
				});
			break;
			case "events_rel" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				DB.events.find({}, {skip:skip, limit:limit}).toArray(function(err, records){
					if (records.length) {
						for(var a=0;a<records.length;a++){
							updateEvents(records[a]);
						}
						limit = req.query.limit ? parseInt(req.query.limit) : 2;
						skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
						res.render('import', {  locals: {url : "/import/?data=events_rel&skip="+skip+"&limit="+limit } });
			  		} else {
				  		res.render('import', {  locals: {msg : "DONE"} });
			  		}
				});
			break;
			case "gallery_rel" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 20;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				DB.gallery.find({}, {skip:skip, limit:limit}).toArray(function(err, records){
					if (records.length) {
						for(var a=0;a<records.length;a++){
							updateGallery(records[a]);
						}
						limit = req.query.limit ? parseInt(req.query.limit) : 2;
						skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
						res.render('import', {  locals: {url : "/import/?data=gallery_rel&skip="+skip+"&limit="+limit } });
			  		} else {
				  		res.render('import', {  locals: {msg : "DONE"} });
			  		}
				});
			break;
			case "tvshow_rel" :
				var limit = req.query.limit ? parseInt(req.query.limit) : 2;
				var skip = req.query.skip ? parseInt(req.query.skip) : 0;
				DB.tvshow.find({}, {skip:skip, limit:limit}).toArray(function(err, records){
					if (records.length) {
						for(var a=0;a<records.length;a++){
							updateTvshow(records[a]);
						}
						limit = req.query.limit ? parseInt(req.query.limit) : 2;
						skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
						res.render('import', {  locals: {url : "/import/?data=tvshow_rel&skip="+skip+"&limit="+limit } });
			  		} else {
				  		res.render('import', {  locals: {msg : "DONE"} });
			  		}
				});
			break;
		}
	} else {
		res.render('import', {  locals: {menu : true} });
	}
};
function eraseAndInsert(table,obj,callback) {
	table.remove({old_id: obj.old_id}, {safe:true}, function(err, records){
		table.insert(obj, {safe: true}, function(err, records){
			//callback(err, records);
		});
	});
}
function eraseAndInsertChiavi(table,obj,callback) {
	table.remove({old_id: obj.old_id}, {safe:true}, function(err, records){
		table.findOne({old_id: obj.e}, function(err, record){
			console.dir(record);
			obj.ancestors = (record ? [{_id:record._id}] : []);
			delete obj.ancestor_old_id;
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
function updateEcodeUsersData(data) {
	data.old_id = data.uid;
	delete data.uid;
	data.is_crew = parseFloat(data.is_crew);

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

function updateUserFile(file){
	var newFile = (file.substring(0,file.lastIndexOf('_'))).concat('.',file.substring(file.lastIndexOf('_')+1,file.lastIndexOf('.')));
	return newFile.replace("\/90x68","");
}
function updateUser(user) {
	if(user.avatar) {
		if(!(user.avatar.substring(user.avatar.length-15,user.avatar.length)=="defaultUser.gif")){
			user.files = [{
				file:	updateUserFile(user.avatar)
			}];
		}
		delete user.avatar;
	}
	DB.users.find({"members.old_id":user.old_id}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		delete user.crews;
		if (subrecords.length) user.crews = subrecords;
		DB.users.find({"crews.old_id":user.old_id}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
			delete user.members;
			if (subrecords.length) user.members = subrecords;
			DB.footage.find({"users.old_id":user.old_id}, {fields:{_id:1,title:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
				if (subrecords.length) user.footage = subrecords;
				DB.playlists.find({"users.old_id":user.old_id}, {fields:{_id:1,title:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
					if (subrecords.length) user.playlists = subrecords;
					DB.performances.find({"users.old_id":user.old_id}, {fields:{_id:1,title:1,permalink:1,files:1,categories:1,stats:1}}).toArray(function(err, subrecords){
						if (subrecords.length) user.performances = subrecords;
						DB.events.find({"users.old_id":user.old_id}, {fields:{_id:1,title:1,permalink:1,files:1,categories:1,stats:1}}).toArray(function(err, subrecords){
							if (subrecords.length) user.events = subrecords;
							DB.tvshow.find({"users.old_id":user.old_id}, {fields:{_id:1,title:1,permalink:1,files:1,categories:1,stats:1}}).toArray(function(err, subrecords){
								if (subrecords.length) user.tvshow = subrecords;
								DB.gallery.find({"users.old_id":user.old_id}, {fields:{_id:1,title:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
									if (subrecords.length) user.gallery = subrecords;
									DB.users.save(user);
									DB.users.findOne({_id:user._id},function(err, record){
										console.dir(record);
									});
								});
							});
						});
					});
				});
			});
		});
	});
}
function updateFootage(obj) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		DB.footage.save(obj);
		DB.footage.findOne({_id:obj._id},function(err, record){
			console.dir(record);
		});
	});
}
function updateTvshow(obj) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		DB.tvshow.save(obj);
		DB.tvshow.findOne({_id:obj._id},function(err, record){
			console.dir(record);
		});
	});
}
function updatePlaylists(obj) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	var footage = [];
	for(item in obj.footage) {
		footage.push(obj.footage[item].old_id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		//console.dir(footage);
		DB.footage.find({"old_id":{$in:footage}}, {fields:{_id:1,title:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
			if (subrecords.length) obj.footage = subrecords;
			DB.playlists.save(obj);
			DB.playlists.findOne({_id:obj._id},function(err, record){
				console.dir(record);
			});
		});
	});
}
function updateGallery(obj) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		DB.gallery.save(obj);
		DB.gallery.findOne({_id:obj._id},function(err, record){
			console.dir(record);
		});
	});
}
function updatePerformances(obj) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	var gallery = [];
	for(item in obj.gallery) {
		gallery.push(obj.gallery[item].id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		DB.gallery.find({"old_id":{$in:gallery}}, {fields:{_id:1,title:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
			if (subrecords.length) obj.gallery = subrecords;
			DB.categories.find({"old_id":{$in:obj.categories}}, {fields:{_id:1,name:1,slug:1,ancestors:1}}).toArray(function(err, subrecords){
				if (subrecords.length) obj.categories = subrecords;
				//console.dir(obj);
				DB.performances.save(obj);
				DB.performances.findOne({_id:obj._id},function(err, record){
					console.dir(record);
				});
			});
		});
	});
}
function updateEvents(obj) {
	var users = [];
	for(item in obj.users) {
		users.push(obj.users[item].old_id);
	}
	var partners = {};
	partners["PRODUCTION"] = [];
	if (obj.partners && obj.partners["PRODUCTION"]) {
		for(item in obj.partners["PRODUCTION"]) {
			partners["PRODUCTION"].push(obj.partners["PRODUCTION"][item].uid);
		}
	}
	partners["SUPPORTED BY"] = [];
	if (obj.partners && obj.partners["SUPPORTED BY"]) {
		for(item in obj.partners["SUPPORTED BY"]) {
			partners["SUPPORTED BY"].push(obj.partners["SUPPORTED BY"][item].uid);
		}
	}
	partners["APPROVED BY"] = [];
	if (obj.partners && obj.partners["APPROVED BY"]) {
		for(item in obj.partners["APPROVED BY"]) {
			partners["APPROVED BY"].push(obj.partners["APPROVED BY"][item].uid);
		}
	}
	partners["TECHNICAL PARTNERS"] = [];
	if (obj.partners && obj.partners["TECHNICAL PARTNERS"]) {
		for(item in obj.partners["TECHNICAL PARTNERS"]) {
			partners["TECHNICAL PARTNERS"].push(obj.partners["TECHNICAL PARTNERS"][item].uid);
		}
	}
	partners["MEDIA PARTNERS"] = [];
	if (obj.partners && obj.partners["MEDIA PARTNERS"]) {
		for(item in obj.partners["MEDIA PARTNERS"]) {
			partners["MEDIA PARTNERS"].push(obj.partners["MEDIA PARTNERS"][item].uid);
		}
	}
	partners["LPM NETWORK"] = [];
	if (obj.partners && obj.partners["LPM NETWORK"]) {
		for(item in obj.partners["LPM NETWORK"]) {
			partners["LPM NETWORK"].push(obj.partners["LPM NETWORK"][item].uid);
		}
	}
	var gallery = [];
	for(item in obj.gallery) {
		gallery.push(obj.gallery[item].id);
	}
	var performances = [];
	for(item in obj.performances) {
		performances.push(obj.performances[item].id);
	}
	DB.users.find({"old_id":{$in:users}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
		if (subrecords.length) obj.users = subrecords;
		DB.gallery.find({"old_id":{$in:gallery}}, {fields:{_id:1,title:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
			if (subrecords.length) obj.gallery = subrecords;
			DB.categories.find({"old_id":{$in:obj.categories}}, {fields:{_id:1,name:1,slug:1,ancestors:1}}).toArray(function(err, subrecords){
				if (subrecords.length) obj.categories = subrecords;
				DB.performances.find({"old_id":{$in:performances}}, {fields:{_id:1,title:1,permalink:1,files:1,categories:1}}).toArray(function(err, subrecords){
					if (subrecords.length) obj.performances = subrecords;
					DB.users.find({"old_id":{$in:partners["PRODUCTION"]}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
						if (subrecords.length) obj.partners["PRODUCTION"] = subrecords;
						DB.users.find({"old_id":{$in:partners["SUPPORTED BY"]}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
							if (subrecords.length) obj.partners["SUPPORTED BY"] = subrecords;
							DB.users.find({"old_id":{$in:partners["APPROVED BY"]}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
								if (subrecords.length) obj.partners["APPROVED BY"] = subrecords;
								DB.users.find({"old_id":{$in:partners["TECHNICAL PARTNERS"]}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
									if (subrecords.length) obj.partners["TECHNICAL PARTNERS"] = subrecords;
									DB.users.find({"old_id":{$in:partners["MEDIA PARTNERS"]}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
										if (subrecords.length) obj.partners["MEDIA PARTNERS"] = subrecords;
										DB.users.find({"old_id":{$in:partners["LPM NETWORK"]}}, {fields:{_id:1,display_name:1,permalink:1,files:1,stats:1}}).toArray(function(err, subrecords){
											if (subrecords.length) obj.partners["LPM NETWORK"] = subrecords;
											console.dir(obj);
											//DB.events.save(obj);
											DB.events.findOne({_id:obj._id},function(err, record){
												console.dir(record);
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
}





function updateEcodeFootageData(data) {
	data.old_id = data.id;
	delete data.id;
	if(data.file_info) {
		//console.dir(data.file_info);
		data.files = [{
			folder:		"/"+data.file_info.cartella+"/",
			file:		data.file_info.nome,
			encoded:	parseInt(data.encoded),
			preview:	data.img_arr.replace("90x68/","")
		}];
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
	data.stats = [{
		visits:			data.visite,
		downloads:		data.download,
		rates:			data.rateArr
	}];
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
		data.files = [{
			preview:	data.img_arr.replace("400x300/","")
		}];
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
	data.stats = [{
		visits:			data.visite,
		downloads:		data.download,
		rates:			data.rateArr
	}];
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
		data.files = [{
			preview:	data.img_arr.replace("400x300/","")
		}];
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

	data.stats = [{
		visits:			data.visite,
		rates:			data.rateArr
	}];
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
		data.files = [{
			preview:	data.img_arr.replace("400x300/","")
		}];
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

	data.stats = [{
		visits:			data.visite,
		rates:			data.rateArr
	}];
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
		data.files = [{
			preview:	data.img_arr.replace("90x68/",""),
			preview2:	"/"+data.preview_file,
			file:		data.file
		}];
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

	data.stats = [{
		visits:			data.visite,
		rates:			data.rateArr
	}];
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
		data.files = [{
			preview:	data.img_arr.replace("400x300/","")
		}];
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








