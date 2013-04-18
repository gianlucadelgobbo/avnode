var email   = require("emailjs");
var server  = email.server.connect(_config.emaildispatcher.server);
var EM = {};
/*
email = {
	text:    "i hope this works", 
	to:      req.body.email,
	subject: "testing emailjs"
}
*/
EM.sendMail = function(email, callback) {
	email.from = _config.emaildispatcher.nameFrom+" <"+_config.emaildispatcher.emailFrom+">";
	server.send(email, function(err, message) {
		console.log(err || message);
		callback(err, message);
	});
}
module.exports = EM;
