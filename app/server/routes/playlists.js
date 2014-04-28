var DB = require('../modules/db-manager');
var Fnc = require('../modules/general-functions');

exports.get = function get(req, res) {
	var sez = "playlists";
	Fnc.getList(req.params[0], sez, res, 0, function(err, tot, records, conf){
		res.render("list", {locals: {title:_config.sections[sez].title, sez:sez, tot:tot, path:conf.path, sort:conf.sort, filter:conf.filter, skip:conf.skip, result:records, Fnc:Fnc}, user : req.session.user});
	});
};
