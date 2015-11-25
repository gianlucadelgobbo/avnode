var email   = require("emailjs");
var config = require('getconfig');
var server  = email.server.connect(config.emaildispatcher.server);
var EM = {};
/*
email = {
	text:    "i hope this works", 
	to:      req.body.email,
	subject: "testing emailjs"
}
*/
EM.sendMail = function(email, callback) {
	email.from = config.emaildispatcher.nameFrom+" <"+config.emaildispatcher.emailFrom+">";
	server.send(email, function(err, message) {
		callback(err, message);
	});
};
module.exports = EM;
