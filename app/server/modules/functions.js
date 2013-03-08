var bcrypt = require('bcrypt');
var DB = require('./db-manager');
var http = require('http');
var request = require('request');

exports.getConf = function getConf(params, sez, res) {
	var p = params.split("page-");
	var page = parseInt(p[1]);
	var params2 = p[0].split("/");
	if (params2[0]=="") params2.shift();
	if (params2[params2.length-1]=="") params2.pop();
	var path = "/"+_config.sections[sez].basepath+"/"+(params2[0] ? params2[0]+"/" : "").replace("//","/");
	path = path.replace("//","/");
	if (page === 0 || page === 1) res.redirect(path);
	if (params2[0]) {
		if (!this.in_array(params2[0],_config.sections[sez].valid)) {
			res.send(404);
		} else {
			var sort = params2[0];
		}
	} else {
		var sort = _config.sections[sez].default;
	}
	var skip = page ? (page-1)*_config.sections[sez].limit : 0;
	var conf = {skip:skip,page:(page ? page : 1),path:path,sort:sort};
	return conf;
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
				        	DB.setPassword(o.login, o.password, function(err, o) {
								callback(e, o);
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
