var DB = require('../modules/db-manager');
var Fnc = require('../modules/functions');

exports.get = function get(req, res) {
	var sez = "performers";
	var conf = Fnc.getConf(req.params[0], sez);
	DB.users.find({}).count(function(err, tot){
		DB.users.find({}, {skip:conf.skip, limit:_config.sections[sez].limit}).sort(_config.sections[sez].sortQ[conf.sort]).toArray(function(err, records){
			res.render(_config.sections[sez].view_list, {locals: {sez:sez, tot:tot, path:conf.path, sort:conf.sort, skip:conf.skip, result:records, udata:req.session.user }});
		});
	});
};
