var bcrypt = require('bcrypt-nodejs');
var DB = require('./db-manager');
var http = require('http');
var url = require('url');
var request = require('request');
var im = require('imagemagick');
var fs = require('fs');
var mkdirp = require('mkdirp');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

exports.getList = function (params, sez, res, ids, callback) {
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
	//console.dir(_config.sections[sez].coll);
	DB[_config.sections[sez].coll].find(searchQ, {"_id": 1 }).count(function(err, tot){
		DB[_config.sections[sez].coll].find(searchQ, _config.sections[sez].list_fields, {skip:conf.skip, limit:_config.sections[sez].limit}).sort(_config.sections[sez].sortQ[conf.sort]).toArray(function(err, records){
            console.dir(err);
			callback(err, tot, records, conf);
		});
	});
}
exports.getPermalink = function (str) {
    str = str.split(' ').join('-');
    return str;
}
exports.getEventDate = function (date) {
	var d = new Date(date);
	//return moment(d).format("dddd, MMMM Do YYYY, h:mm");
	return moment(d).format("dddd, MMMM Do YYYY");
}
exports.formatLoc = function (locations) {
	var str = "";
	var tmp = {};
	for(var a=0;a<locations.length;a++) {
		if (!tmp[locations[a].country]) tmp[locations[a].country] = {};
		tmp[locations[a].country][locations[a].city]=1; 
	}
	//console.log(tmp);
	for(country in tmp) {
		str+="<b>"+country+"</b> (";
		for(city in tmp[country]) {
			str+="<a href=\"#\" onclick=\"showNear('"+country+"','"+city+"')\">"+city+"</a>, ";
		}
		str = str.substring(0,str.length-2)+"), ";
	}
	str = str.substring(0,str.length-2);
	return str;
}

exports.parseParams = function (params) {
	var p = params.split("page-");
	var page = parseInt(p[1]);
	var params2 = p[0].split("/");
	if (params2[0]=="") params2.shift();
	if (params2[params2.length-1]=="") params2.pop();
	return {page:page,params2:params2}
}

exports.getConf = function (params, sez, res) {
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
	//console.log("filter: "+filter);
	var skip = page ? (page-1)*_config.sections[sez].limit : 0;
	var conf = {skip:skip,page:(page ? page : 1),path:path,filter:filter,sort:sort};
	return conf;
}

exports.getTextFormat = function (text, lang, defaultlang) {
	str = (text[lang] ? text[lang] : (defaultlang ? (text[_config.defaultLocale] ? text[_config.defaultLocale] : text[0]) : ""));
	if (str) {
		str = str.replace(new RegExp("###b###","gm"), "<b>");
		str = str.replace(new RegExp("###/b###","gm"), "</b>");
		str = str.replace(new RegExp("\n","gm"), "<br />");
	}
	return str;
}

exports.getFileFormat = function (obj, w, h) {
	if (obj && obj.length && obj[0].file) {
		var source = 		obj[0].file;
		var folder = 		source.substring(0,source.lastIndexOf("/")+1);
		var file = 			source.substring(source.lastIndexOf("/")+1,source.length);
		var ext = 			file.substring(file.lastIndexOf(".")+1,file.length);
		var previewfile = 	file.substring(0,file.lastIndexOf("."))+"_"+ext+".png";
		var formatfile = 	file.substring(0,file.lastIndexOf("."))+"_"+ext+".jpg";
		var formatfolder = 	folder+w+"x"+h+"/";
		/*
		console.log("---------");
		console.log(_config.sitepath);
		console.log(_config.uploadpath);
		console.log(folder);
		console.log(file);
		console.log(formatfolder);
		console.log(formatfile);
		console.log(_config.sitepath+_config.uploadpath+formatfolder+formatfile);
		console.log(_config.sitepath+_config.uploadpath+folder+file);
		console.log("---------");
		*/
		console.log(_config.sitepath+_config.uploadpath+formatfolder+formatfile);
		if (fs.existsSync(_config.sitepath+_config.uploadpath+formatfolder+formatfile)) {
			console.log(formatfolder+formatfile);
			return formatfolder+formatfile;
		} else {
			var imgExt = ['jpg','jpeg','gif','png'];
			var originalImg = fs.existsSync(_config.sitepath+_config.uploadpath+folder+"preview_files/"+previewfile) ? _config.sitepath+_config.uploadpath+folder+"preview_files/"+previewfile : fs.existsSync(_config.sitepath+_config.uploadpath+folder+file) && imgExt.indexOf(ext)!=-1  ? _config.sitepath+_config.uploadpath+folder+file : false;
			if (originalImg) {
				mkdirp.sync(_config.sitepath+_config.uploadpath+formatfolder);
				im.crop({
					srcPath: originalImg,
					dstPath: _config.sitepath+_config.uploadpath+formatfolder+formatfile,
					width: w,
					height: h,
					quality: 1,
					gravity: "North"
				}, function(err, stdout, stderr){
					//console.log("croppato"+_config.sitepath+_config.uploadpath+formatfolder+formatfile);
					//console.dir(err);
					//console.dir(stdout);
					//console.dir(stderr);
					//console.log("croppato"+formatfolder+formatfile);
				});
				return formatfolder+formatfile;
			} else {
				return "/warehouse/defaults/"+w+"x"+h+".jpg";
				//return "/warehouse/defaults/"+w+"x"+h+".jpg";
			}
		}
	} else {
		return "/warehouse/defaults/"+w+"x"+h+".jpg";
	}
}
exports.is_email = function(e) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(e);
}

exports.in_array = function (needle, haystack) {
	for(var i in haystack) {
		if(haystack[i] == needle) return true;
	}
	return false;
}
