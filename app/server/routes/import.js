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
			DB.users.find({old_id:'480'}).toArray(function(err, records){
				for(var a=0;a<records.length;a++){
					updateUser(records[a]);
				}
		  		res.send("/import/?data=users&skip="+skip+"&limit="+limit+"\n\n");
			});
			/*
			DB.users.find({"is_crew":0}).toArray(function(err, records){
				for(var a=0;a<records.length;a++){
					if(records[a].crews.length){
						crews_old_ids = [];
						for(var b=0;b<records[a].crews.length;b++){
							crews_old_ids.push(records[a].crews[b].old_id);
						}
						updateUsers(records[a],crews_old_ids);
					}
				}
		  		res.send("/import/?data=users&skip="+skip+"&limit="+limit+"\n\n");
			});
			*/
		break;
		case "crews_rel" :
			DB.users.find({"is_crew":1}).toArray(function(err, records){
				for(var a=0;a<records.length;a++){
					//console.dir(records[a].members);
					members_old_ids = [];
					for(var b=0;b<records[a].members.length;b++){
						members_old_ids.push(records[a].members[b].old_id);
					}
					updateCrew(records[a],members_old_ids);
				}
		  		res.send("/import/?data=users&skip="+skip+"&limit="+limit+"\n\n");
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
		table.findOne({old_id: obj.ancestor_old_id}, {safe: true}, function(err, record){
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
function updateUser(user) {
	DB.users.find({"members.old_id":user.old_id}).toArray(function(err, subrecords){
		if (subrecords.length) user.crews = subrecords;
		DB.users.find({"crews.old_id":user.old_id}).toArray(function(err, subrecords){
			if (subrecords.length) user.members = subrecords;
			DB.footage.find({"users.old_id":user.old_id}).toArray(function(err, subrecords){
				if (subrecords.length) user.footage = subrecords;
				DB.playlists.find({"users.old_id":user.old_id}).toArray(function(err, subrecords){
				console.dir(subrecords);
					if (subrecords.length) user.playlists = subrecords;
					DB.performances.find({"users.old_id":user.old_id}).toArray(function(err, subrecords){
						if (subrecords.length) user.performances = subrecords;
						DB.events.find({"users.old_id":user.old_id}).toArray(function(err, subrecords){
							if (subrecords.length) user.events = subrecords;
							DB.tvshow.find({"users.old_id":user.old_id}).toArray(function(err, subrecords){
								if (subrecords.length) user.tvshow = subrecords;
								DB.gallery.find({"users.old_id":user.old_id}).toArray(function(err, subrecords){
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
function updateUsers(user,crews_old_ids) {
	DB.users.find({old_id:{ $all: crews_old_ids }}).toArray(function(err, subrecords){
		user.crews = subrecords;
		DB.users.save(user);
		DB.users.findOne({_id:user._id},function(err, record){
			console.dir(record);
		});
	});
}
function updateCrew(crew,members_old_ids) {
	DB.users.find({old_id:{ $all: members_old_ids }}).toArray(function(err, subrecords){
		crew.members = subrecords;
		DB.users.save(crew);
		DB.users.findOne({_id:crew._id},function(err, record){
			console.dir(record);
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








