var http = require('http');
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
var DB = require('../modules/db-manager');

exports.get = function get(req, res) {
	switch(req.query.data){
		case "footage" :
			var limit = req.query.limit ? parseInt(req.query.limit) : 2;
			var skip = req.query.skip ? parseInt(req.query.skip) : 0;
			//if (skip==0 && DB.users) DB.users.remove();
			http.get({host:"flxer.net",path:"/api/footage/?skip="+skip+"&limit="+limit},function(response){
				var pageData = "";
				response.setEncoding('utf8');
				response.on('data', function (chunk) {
					pageData += chunk;
				});
				response.on('end', function(){
					var ress = updateEcodeFootageData(JSON.parse(pageData));
					if (ress) for(var a=0;a<ress.length;a++) {
						ress[a] = updateEcodeFootageData(ress[a]);
						console.dir(ress[a]);
						//DB.users.insert(ress[a], {safe: true}, function(err, records){
							//callback(err, records);
						//});
			  		}
			  		//res.send(JSON.stringify(ress, null, '\t'));
					limit = req.query.limit ? parseInt(req.query.limit) : 2;
					skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
			  		res.render('import', {  locals: {url : "/import/?data=footage&skip="+skip+"&limit="+limit } });
			  		//res.send("/import/?data=users&skip="+skip+"&limit="+limit+"\n\n"+JSON.stringify(ress, null, '\t'));
			  		//res.end();
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
					var ress = updateEcodeUsersData(JSON.parse(pageData));
					if (ress) for(var a=0;a<ress.length;a++) {
						ress[a] = updateEcodeUsersData(ress[a]);
						DB.users.insert(ress[a], {safe: true}, function(err, records){
							//callback(err, records);
						});
			  		}
			  		//res.send(JSON.stringify(ress, null, '\t'));
					limit = req.query.limit ? parseInt(req.query.limit) : 2;
					skip = req.query.skip ? parseInt(req.query.skip)+limit : 2;
			  		res.render('import', {  locals: {url : "/import/?data=users&skip="+skip+"&limit="+limit } });
			  		//res.send("/import/?data=users&skip="+skip+"&limit="+limit+"\n\n"+JSON.stringify(ress, null, '\t'));
			  		//res.end();
				});
			});
		break;
		case "users_rel" :
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
};
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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

	
	/*
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

	data.creation_date = new Date(parseInt(data.dataIscrInt)*1000);
	delete data.dataIscrInt;
	*/
	return data;
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

	data.creation_date = new Date(parseInt(data.dataIscrInt)*1000);
	delete data.dataIscrInt;

	return data;
}








