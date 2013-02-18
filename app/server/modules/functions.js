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
