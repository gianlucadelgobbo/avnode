var DB = require('../modules/db-manager');
var Fnc = require('../modules/general-functions');
var config = require('getconfig');

exports.get = function get(req, res) {
	var pathArray = req.url.split("/");
	var output = (req.query.output ? req.query.output : false);
	if (pathArray[0]=="") pathArray.shift();
	if (pathArray[pathArray.length-1]=="") pathArray.pop();
	if (pathArray[pathArray.length-1].indexOf("output")!=-1) pathArray.pop();
	console.dir(pathArray);
	console.dir(pathArray[pathArray.length-1].indexOf("output"));
	var uu;
	if (req.session.passport && req.session.passport.user) {
		uu = req.session.passport.user;
	}
	if (pathArray.length > 0) {
		DB.users.findOne({permalink:pathArray[0]}, function(e, result) {
			if (result) {
				if (pathArray.length > 1) {
					if (pathArray.length > 2) {
						if (pathArray.length > 3) {
							if (pathArray.length > 4) {
								DB.users.findOne({permalink:pathArray[0]}, function(e, result) {
									res.sendStatus(404);
									/*
									if (result) {
										res.render('performer', { userpage:true, title: result.display_name, result : result, Fnc:Fnc, user : uu });
									} else {
										res.sendStatus(404);
									}
									*/
								});
							} else if (config.sections[pathArray[1]]) {
								- console.dir("bella"+pathArray.length)
								DB[config.sections[pathArray[1]].coll].findOne({permalink:pathArray[2],"footage.permalink":pathArray[3]}, function(e, dett) {
									if (dett) {
										for (item in dett.footage) {
											if (dett.footage[item].permalink==pathArray[3]) dettdett = dett.footage[item];
										}
										if (output=="json") {
											res.send(result);
										} else if (output=="xml") {
											res.render('performer_dett_'+pathArray[1]+"_single"+"_xml", {	layout: false, userpage:true, title: result.display_name+": "+config.sections[pathArray[1]].title, sez:pathArray[1], result : result, dett : dett, Fnc:Fnc, user : uu });
										} else {
											res.render('performer_dett_'+pathArray[1]+"_single", { userpage:true, title: result.display_name+": "+config.sections[pathArray[1]].title+": "+config.sections[pathArray[1]].title, sez:pathArray[1], result : result, dett : dett, dettdett : dettdett, Fnc:Fnc, user : uu });
										}
									} else {
										res.sendStatus(404);
									}
								});
							} else {
								res.sendStatus(404);
							}
						} else if (config.sections[pathArray[1]]) {
							DB[config.sections[pathArray[1]].coll].findOne({permalink:pathArray[2]}, function(e, dett) {
								if (dett) {
									if (output=="json") {
										res.send(result);
									} else if (output=="xml") {
										res.render('performer_dett_'+pathArray[1]+"_xml", {	layout: false, userpage:true, title: result.display_name+": "+config.sections[pathArray[1]].title, sez:pathArray[1], result : result, dett : dett, Fnc:Fnc, user : uu });
									} else {
										res.render('performer_dett_'+pathArray[1], { userpage:true, title: result.display_name+": "+config.sections[pathArray[1]].title, sez:pathArray[1], result : result, dett : dett, Fnc:Fnc, user : uu });
									}
								} else {
									res.sendStatus(404);
								}
							});
						} else {
							res.sendStatus(404);
						}
					} else if (config.sections[pathArray[1]]) {
						res.render('performer_list', { userpage:true, title: result.display_name+": "+config.sections[pathArray[1]].title, sez:pathArray[1], result : result, Fnc:Fnc, user : uu });
					} else {
						res.sendStatus(404);
					}
				} else {
					console.log("ecchime");
					console.log(result.files);
					res.render('performer', { userpage:true, title: result.display_name, result : result, Fnc:Fnc, user : uu });
				}
			} else {
				res.sendStatus(404);
			}
		});
	} else {
		res.sendStatus(404);
	}
};
