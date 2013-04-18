var bcrypt = require('bcrypt');
var DB = require('./db-manager');
var http = require('http');
var url = require('url');
var request = require('request');
var im = require('imagemagick');
var fs = require('fs');
var mkdirp = require('mkdirp');
var ObjectID = require('mongodb').ObjectID;

exports.getList = function getList(params, sez, res, ids, callback) {
	var conf = exports.getConf(params, sez, res);
	var searchQ = _config.sections[sez].searchQ[conf.filter];
	//ids = ["515c07ccdad037523c000903"];
	//if (ids && sez=="performers") searchQ = {"permalink":ids[0]};
	if (ids && sez=="performers") {
		searchQ["_id"] = {$in:ids};
		_config.sections[sez].list_fields.crews = 1;
	} else if (ids) {
		searchQ["users._id"] = {$in:ids};
	}
	//if (ids && sez=="performers") searchQ = {"_id":new ObjectID(ids[0])};
	//if (ids) searchQ["users._id"] = {$in:ids};
	//searchQ = {"users._id": {$in: [new ObjectID("515c07ccdad037523c000903")]}};
	//searchQ = {"users._id": new ObjectID("50f836b77ad42b00000003ad")};
	console.dir(searchQ);
	console.dir(_config.sections[sez].coll);
	DB[_config.sections[sez].coll].find(searchQ, {"_id": 1 }).count(function(err, tot){
		console.dir(tot);
		DB[_config.sections[sez].coll].find(searchQ, _config.sections[sez].list_fields, {skip:conf.skip, limit:_config.sections[sez].limit}).sort(_config.sections[sez].sortQ[conf.sort]).toArray(function(err, records){
			console.dir(records);
			callback(err, tot, records, conf);
		});
	});
}

exports.parseParams = function parseParams(params) {
	var p = params.split("page-");
	var page = parseInt(p[1]);
	var params2 = p[0].split("/");
	if (params2[0]=="") params2.shift();
	if (params2[params2.length-1]=="") params2.pop();
	return {page:page,params2:params2}
}

exports.getConf = function getConf(params, sez, res) {
	var p = exports.parseParams(params);
	var page = p.page;
	var params2 = p.params2;
	var path = "/"+_config.sections[sez].basepath+"/"+(params2[0] ? params2[0]+"/" : "")+(params2[1] ? params2[1]+"/" : "");
	path = path.replace("//","/");
	if (page === 0 || page === 1) res.redirect(path);
	if (params2[0]) {
		if (!this.in_array(params2[0],_config.sections[sez].categories)) {
			res.send(404);
		} else {
			var filter = params2[0];
		}
	} else {
		var filter = _config.sections[sez].categories[0];
	}
	if (params2[1]) {
		if (!this.in_array(params2[1],_config.sections[sez].orders)) {
			res.send(404);
		} else {
			var sort = params2[1];
		}
	} else {
		var sort = _config.sections[sez].orders[0];
	}
	console.log("filter: "+filter);
	var skip = page ? (page-1)*_config.sections[sez].limit : 0;
	var conf = {skip:skip,page:(page ? page : 1),path:path,filter:filter,sort:sort};
	return conf;
}

exports.getFileFormat = function (obj, w, h) {
	if (obj && obj.length && obj[0].file) {
		var source = obj[0].file;
		var folder = source.substring(0,source.lastIndexOf("/")+1);
		var file = source.substring(source.lastIndexOf("/"),source.length);
		var ext = file.substring(file.lastIndexOf(".")+1,file.length);
		var file = file.substring(0,file.lastIndexOf("."))+"_"+ext+".jpg";
		var formatfolder = folder+w+"x"+h;
		if (fs.existsSync(_config.sitepath+_config.uploadpath+formatfolder+file)) {
			return formatfolder+file;
		} else if (fs.existsSync(_config.sitepath+_config.uploadpath+folder+file)) {
			mkdirp.sync(_config.sitepath+_config.uploadpath+formatfolder);
			im.crop({
				srcPath: _config.sitepath+_config.uploadpath+folder+file,
				dstPath: _config.sitepath+_config.uploadpath+formatfolder+file,
				width: w,
				height: h,
				quality: 1,
				gravity: "North"
			}, function(err, stdout, stderr){
				console.log("croppato"+formatfolder+file)
			});
			return formatfolder+file;
		} else {
			return "https://flxer.net"+"/warehouse/defaults/"+w+"x"+h+".jpg";
			//return "/warehouse/defaults/"+w+"x"+h+".jpg";
		}
	} else {
		return "https://flxer.net"+"/warehouse/defaults/"+w+"x"+h+".jpg";
	}
}

exports.in_array = function (needle, haystack) {
	for(var i in haystack) {
		if(haystack[i] == needle) return true;
	}
	return false;
}
exports.validateFormLogin = function validateFormLogin(o,callback) {
	var e = [];
	DB.users.findOne({login:o.login}, function(err, result) {
		if (result == null){
			e.push({name:"user",m:__("User not found")});
			callback(e, o);
		} else {
			if (!result.password) result.password = " ";
			bcrypt.compare(o.password, result.password, function(err, res) {
				if (res) {
					console.dir("login interno");
					callback(e, result);
				} else {
					var userString = JSON.stringify();
					request.post({
					    uri:"httpS://flxer.net/api/login",
					    headers:{'content-type': 'application/x-www-form-urlencoded'},
					    body:require('querystring').stringify({login:o.login, password:o.password})
				    },function(err,res,body){
				    	var ress = JSON.parse(body);
				        if (ress.login) {
				        	DB.setPassword(o.login, o.password, function(err, oo) {
								callback(e, oo);
							});
				        } else {
							e.push({name:"user",m:__("Login failed")});
							callback(e, o);
				        }
					});
				}
			});
		}
	});
};
