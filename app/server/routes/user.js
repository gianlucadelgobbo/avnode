var DB = require('../modules/db-manager');
var Fnc = require('../modules/functions');

exports.get = function get(req, res) {
	var pathArray = req.url.split("/");
	var output = (req.query.output ? req.query.output : false);
	if (pathArray[0]=="") pathArray.shift();
	if (pathArray[pathArray.length-1]=="") pathArray.pop();
	if (pathArray[pathArray.length-1].indexOf("output")!=-1) pathArray.pop();
	console.dir(pathArray);
	console.dir(pathArray[pathArray.length-1].indexOf("output"));
	if (pathArray.length > 0) {
		DB.users.findOne({permalink:pathArray[0]}, function(e, result) {
			if (result) {
				if (pathArray.length > 1) {
					if (pathArray.length > 2) {
						if (pathArray.length > 3) {
							DB.users.findOne({permalink:pathArray[0]}, function(e, result) {
								res.send(404);
								/*
								if (result) {
									res.render('performer', {	locals: { userpage:true, title: result.display_name, result : result, Fnc:Fnc}, user : req.session.user });
								} else {
									res.send(404);
								}
								*/
							});
						} else if (_config.sections[pathArray[1]]) {
							DB[_config.sections[pathArray[1]].coll].findOne({permalink:pathArray[2]}, function(e, dett) {
								if (dett) {
									if (output=="json") {
										res.send(result);
									} else if (output=="xml") {
										res.render('performer_dett_'+pathArray[1]+"_xml", {	layout: false, locals: { userpage:true, title: result.display_name+": "+_config.sections[pathArray[1]].title, sez:pathArray[1], result : result, dett : dett, Fnc:Fnc}, user : req.session.user });
									} else {
										res.render('performer_dett_'+pathArray[1], {	locals: { userpage:true, title: result.display_name+": "+_config.sections[pathArray[1]].title, sez:pathArray[1], result : result, dett : dett, Fnc:Fnc}, user : req.session.user });
									}
								} else {
									res.send(404);
								}
							});
						} else {
							res.send(404);
						}
					} else if (_config.sections[pathArray[1]]) {
						res.render('performer_list', {	locals: { userpage:true, title: result.display_name+": "+_config.sections[pathArray[1]].title, sez:pathArray[1], result : result, Fnc:Fnc}, user : req.session.user });
					} else {
						res.send(404);
					}
				} else {
					res.render('performer', {	locals: { userpage:true, title: result.display_name, result : result, Fnc:Fnc}, user : req.session.user });
				}
			} else {
				res.send(404);
			}
		});
	} else {
		res.send(404);
	}
};
