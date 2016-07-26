var config = require('getconfig');
var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');

var transporter = nodemailer.createTransport(ses({
  accessKeyId: config.amazon.key,
  secretAccessKey: config.amazon.secret,
  region: 'eu-west-1'
}));

var sendMail = function(to, subject, text) {
  var option = {
    from: 'info@avnode.net',
    to: to,
    subject: subject,
    text: text
  };
  transporter.sendMail(option, function(error, info) {
    if (error) return console.log(error);
    console.log('Message sent: ' + info.response);
  });
};

exports.sendMail = function(to, subject, text) {
  sendMail(to, subject, text);
};

exports.sendVerificationMail = function(to, uuid) {
  sendMail(to, 'AVnode E-mail Verification', config.baseurl + 'api/verify-email/' + uuid);
};

exports.sendPasswordChangedMail = function(to) {
  sendMail(to, 'AVnode Password changed', 'Your password has been changed');
};
