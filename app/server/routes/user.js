var DB = require('../modules/db-manager');
var Fnc = require('../modules/functions');

exports.get = function get(req, res) {
	var pathArray = req.url.split("/");
	console.dir(pathArray);
	if (pathArray[0]=="") pathArray.shift();
	console.dir(pathArray);
	if (pathArray[0]) {
		DB.users.findOne({permalink:pathArray[0]}, function(e, result) {
			if (result) {
				res.render('performer', {	locals: { title: result.display_name, result : result, Fnc:Fnc}, user : req.session.user });
			} else {
				res.send(404);
			}
		});
	} else {
		res.send(404);
	}
};
