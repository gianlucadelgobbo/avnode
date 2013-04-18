var DB = require('../../modules/db-manager');
var EM = require('../../modules/email-dispatcher');
var CT = require('../../modules/country-list');

// send the message and get a callback with an error or details of the message that was sent

exports.get = function get(req, res) {
	if (req.query.code) {
		DB.temp_users.findOne({"code":req.query.code},function(err, record){
			
			console.dir(record);
			res.redirect('/controlpanel/user/');
		});
	} else {
		res.render('forms/user_signup', {  locals: {title : "Register", countries: CT}, user : req.session.user });
	}
}

exports.post = function get(req, res) {
	DB.users.findOne({"emails.email":req.body.email},function(err, record){
		if(record){
		} else {
			var temp = req.body;
			DB.saltAndHash(req.body.password,function(hash){
				temp.password = hash;
				DB.saltAndHash(req.body.password+req.body.email,function(hash){
					temp.code = hash;
					DB.temp_users.remove({"email":req.body.email}, {safe: true}, function(err, record){
						DB.temp_users.insert(temp, {safe: true}, function(err, record){
							var text = "";
			console.dir(record);
							text = _config.siteurl+"/signup/?code="+temp.code;
							EM.sendMail({
							   text:    text, 
							   to:      req.body.email,
							   subject: _config.sitename + " | " + __("Signup confirmation")
							}, function(err, message) {
								res.render('forms/user_signup', {  locals: {title : "Signup", record:record}, user : req.session.user });
							});
						});
					});
				});
			});
		}
	});
}
