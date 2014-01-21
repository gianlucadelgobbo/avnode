var DB = require('../../modules/db-manager');
var EM = require('../../modules/email-dispatcher');
var CT = require('../../modules/country-list');
var Fnc = require('../../modules/functions');

// send the message and get a callback with an error or details of the message that was sent

exports.get = function get(req, res) {
	if (req.query.code) {
		DB.temp_users.findOne({"code":req.query.code},function(err, record){
			console.dir(record);
			var user = record;
			user.emails = [];
			user.emails.push({email:user.email,valid:1,primary:1,public:1,mailinglists:{ flxer: 0, flyer: 0, livevisuals: 0, updates: 0 } });
			user.is_crew = 0;
			user.activity = 0;
			user.creation_date = new Date();
			user.public = 0;
			user.login = user.email;
			
			
			delete user._id;
			delete user.email;
			delete user.code;
			if (record.crew_permalink) {
				user.stats = {crews: 1};
				user.crews = [];
				var crew = {};
				crew.display_name = record.crew_display_name;
				crew.permalink = record.crew_permalink;
				crew.is_crew = 1;
				crew.activity = 0;
				crew.creation_date = new Date();
				crew.stats = {members: 1};
				crew.members = [];
				delete user.crew_display_name;
				delete user.crew_permalink;
			}
			console.dir(user);
			console.dir(crew);
			DB.users.insert(user, {safe: true}, function(err, record){
				user = record[0];
				console.dir("DB.users.insert-user");
				console.dir(user);
				crew.members.push({permalink: user.permalink,display_name:user.display_name,_id:user._id, stats:user.stats });
				DB.users.insert(crew, {safe: true}, function(err, record){
					console.dir("DB.users.insert-crew");
					console.dir(record);
					crew = record[0];
					user.crews.push({permalink: crew.permalink,display_name:crew.display_name,_id:crew._id, stats:crew.stats });
					DB.users.save(user, {safe: true}, function(err, record){
						console.dir("DB.users.insert-user 2");
						console.dir(record);
						DB.temp_users.remove({"code":req.query.code}, {safe: true}, function(err, record){
							res.render('forms/user_signup', {  locals: {title : __('Signup'), countries: CT, result:record, msg:{c:[{m:__("Data saved, please login")}]} }, user : req.session.user });
							/*
							EM.sendMail({
							   text:    text, 
							   to:      req.body.email,
							   subject: _config.sitename + " | " + __("Signup confirmation")
							}, function(err, message) {
								res.render('forms/user_signup', {  locals: {title : "Signup", result:record,msg:{c:[{m:m}]}}, user : req.session.user });
							});
							*/
						});
					});
				});
			});
		});
	} else {
		res.render('forms/user_signup', {  locals: {title : __('Signup'), countries: CT, result:req.body}, user : req.session.user });
	}
}

exports.post = function get(req, res) {
	exports.validateFormSignup(req.body, function(e, o, m) {
		if (e && e.length) {
			if (req.body.ajax) {
				res.send({msg:{e:e}}, 200);
			} else {
				//o._id = o.id;
				res.render('forms/user_signup', { locals: { title: __('Signup'), countries: CT, msg:{e:e}, result:req.body}, user : req.session.user});
			}
		} else {
			var temp = o;
			DB.saltAndHash(o.password,function(hash){
				temp.password = hash;
				DB.saltAndHash(o.password+o.email,function(hash){
					temp.code = hash;
					temp.lang = _config.defaultLocale;
					delete temp.passwordconfirm;
					DB.temp_users.remove({"email":o.email}, {safe: true}, function(err, record){
						DB.temp_users.insert(temp, {safe: true}, function(err, record){
							var text = "";
							console.dir(record);
							text = _config.siteurl+"/signup/?code="+temp.code;
							EM.sendMail({
							   text:    text, 
							   to:      o.email,
							   subject: _config.sitename + " | " + __("Signup confirmation")
							}, function(err, message) {
								res.render('forms/user_signup', {  locals: {title : "Signup", result:record,msg:{c:[{m:m}]}}, user : req.session.user });
							});
						});
					});
				});
			});
		}
	});
}
/*
		DB.users.findOne({"emails.email":o.email},function(err, record){
			if(record){
			} else {
			}
		});

*/
exports.validateFormSignup = function (o,callback) {
	console.log(o);
	var e = [];
	if (!o.is_crew) {
		e.push({name:"is_crew",m:__("Please select the type of account: individual or crew")});
	}
	if (o.is_crew) {
		if (o.crew_display_name.length < 1){
			e.push({name:"crew_display_name",m:__("Crew name is too short")});
		}
		if (o.crew_permalink.length < 1){
			e.push({name:"crew_permalink",m:__("Crew profile url is too short")});
		}
		if (o.crew_display_name.length.length > 50){
			e.push({name:"crew_display_name",m:__("Crew name is too long (max. 50 char)")});
		}
		if (o.crew_permalink.length > 50){
			e.push({name:"crew_display_name",m:__("Crew  profile url is too long (max. 50 char)")});
		}
		if (o.crew_permalink == o.permalink){
			e.push({name:"crew_display_name",m:__("Crew  profile url can not be the equal to Profile url")});
		}
	}
	
	if (o.name.length < 1){
		e.push({name:"name",m:__("Name is too short")});
	}
	if (o.name.length > 50){
		e.push({name:"name",m:__("Name is too long (max. 50 char)")});
	}
		
	if (o.surname.length < 1){
		e.push({name:"surname",m:__("Surname is too short")});
	}
	if (o.surname.length > 50){
		e.push({name:"surname",m:__("Surname is too long (max. 50 char)")});
	}

	if (o.gender=="") e.push({name:"gender",m:__("Gender can not be empty")});
	if (o.citizenship=="") e.push({name:"gender",m:__("Country of citizenship can not be empty")});

	var tmp = o.birthdate.split("-");
	o.birth_date = new Date(o.birthdate);
	delete o.birth;
	delete o.birthdate;
	if (!((parseFloat(tmp[2])==o.birth_date.getDate()) && (parseFloat(tmp[1])-1==o.birth_date.getMonth()) && (parseFloat(tmp[0])==o.birth_date.getFullYear()))) e.push({name:"birthdate",m:__("Birth date is not valid")});
		
	if (o.email.length < 1){
		e.push({name:"email",m:__("Email is too short")});
	}
	if (o.email.length > 50){
		e.push({name:"email",m:__("Email is too long (max. 50 char)")});
	}
	if (e.length==0 && !Fnc.is_email(o.email)) {
		e.push({name:"email",m:__("Email is not a valid address")});
	}
	
	if (!o.is_crew) {
		e.push({name:"is_crew",m:__("Please select the type of account: individual or crew")});
	}
	
	if (o.password == o.passwordconfirm){
		if (o.password.length < 8){
			e.push({name:"password",m:__("Password is too short (min 8 char)")});
		}
		if (o.password.length > 50){
			e.push({name:"password",m:__("Password is too long (max. 50 char)")});
		}
	} else {
		e.push({name:"password",m:__("Password does not match the confirm password")});
	}
	
	if (o.display_name.length < 1){
		e.push({name:"display_name",m:__("Stage name is too short")});
	}
	if (o.display_name.length > 50){
		e.push({name:"display_name",m:__("Stage name is too long (max. 50 char)")});
	}
	
	
	if (o.permalink.length < 1){
		e.push({name:"permalink",m:__("Profile url is too short")});
	}
	if (o.permalink.length > 50){
		e.push({name:"permalink",m:__("Profile url is too long (max. 50 char)")});
	}
	if (e.length) {
		callback(e, o, __("We have sent an email to confirm"));
	} else {
		DB.users.findOne({"emails.email":o.email}, function(err, result) {
			if (result != null){
				e.push({name:"email",m:__("Email already in use")});
			}
			DB.users.findOne({"permalink":o.permalink}, function(err, result) {
				if (result != null){
					e.push({name:"email",m:__("Profile url already in use")});
				}
				if (o.is_crew) {
					DB.users.findOne({"permalink":o.crew_permalink}, function(err, result) {
						if (result != null){
							e.push({name:"email",m:__("Crew profile url already in use")});
						}
						callback(e, o, __("We have sent an email to confirm"));
					});
				} else {
					callback(e, o, __("We have sent an email to confirm"));
				}
			});
		});
	}
	
};
