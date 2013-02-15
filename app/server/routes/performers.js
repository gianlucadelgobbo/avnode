var DB = require('../modules/db-manager');
var ObjectID = require('mongodb').ObjectID;
var CT = require('../modules/country-list');

exports.get = function get(req, res) {
	console.dir(req.params);
	sort = req.params[0].replace("/","");
	sort = (sort && _config.sections.performers.valid.indexOf(sort) ? sort : _config.sections.performers.default);
	var limit = req.query.limit ? parseInt(req.query.limit) : _config.sections.performers.limit;
	var skip = req.query.skip ? parseInt(req.query.skip) : 0;
	DB.users.find({}).count(function(err, tot){
		console.dir(tot);
		DB.users.find({}, {skip:skip, limit:limit}).sort(_config.sections.performers.sortQ[sort]).toArray(function(err, records){
			res.render('performers', {	locals: { title:"Performers", sort:sort, tot:tot, skip:skip, limit:limit, result : records, udata : req.session.user } });
		});
	});
};

exports.post = function post(req, res) {
	if (req.session.user == null) {
		res.redirect('/?from='+req.url);
	} else {
		helpers.validateFormAccount(req.body, function(e, o) {
			if (e.length) {
				if (req.body.ajax) {
					res.send({msg:{e:e}}, 200);
				} else {
					if (o.id) o._id = o.id;
					res.render('account', {	locals: {	title: __("Account"), countries : CT, result : o, msg:{e:e}, udata : req.session.user } });
				}
			} else {
				if (req.body.id) {
					DB.update_account(o, function(o){
						var e = [];
						if (o){
							if (req.session.user._id == o._id){
								req.session.user = o;
								// udpate the user's login cookies if they exists //
								if (req.cookies.user !== undefined && req.cookies.pass !== undefined && req.cookies.role !== undefined){
									res.cookie('user', o.user, { maxAge: 900000 });
									res.cookie('pass', o.pass, { maxAge: 900000 });
									res.cookie('role', o.role, { maxAge: 900000 });
								}
							}
						} else {
							e.push({name:"",m:__("Error updating account")});
						}
						if (e.length) {
							if (req.body.ajax) {
								res.send({msg:{e:e}}, 200);
							} else {
								o._id = o.id;
								res.render('account', {	locals: {	title: __("Account"), countries : CT, result : o, msg:{e:e}, udata : req.session.user } });
							}
						} else {
							e.push({name:"",m:__("Account saved with success")});
							if (req.body.ajax) {
								res.send({msg:{c:e}}, 200);
							} else {
								o._id = o.id;
								DB.accounts.findOne({_id:new ObjectID(req.param('id'))},function(err, result) {
									res.render('account', {	locals: {	title: __("Account"), countries : CT, result : result, msg:{c:e}, udata : req.session.user } });
								});
							}
						}
					});
				} else {
					DB.insert_account(req.body, function(e, o){
						// FIXME: error should be dealt with not overwritten
						e = [];
						if (!o){
							e.push({name:"",m:__("Error updating account")});
						}
						if (e.length) {
							if (req.body.ajax) {
								res.send({msg:{e:e}}, 200);
							} else {
								res.render('account', {	locals: {	title: __("Client"), countries : CT, result : o[0], msg:{e:e}, udata : req.session.user } });
							}
						} else {
							e.push({name:"",m:__("Account saved with success")});
							if (req.body.ajax) {
								res.send({msg:{c:e}}, 200);
							} else {
								DB.accounts.findOne({_id:o[0]._id},function(err, result) {
									res.render('account', {	locals: {	title: __("Client"), countries : CT, result : result, msg:{c:e}, udata : req.session.user } });
								});
							}
						}
					});
				}
			}
		});
	}
};
