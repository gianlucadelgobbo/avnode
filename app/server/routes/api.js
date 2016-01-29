var express = require('express');
var router = express.Router();

var fs = require('fs');
var process = require('process');

var multer = require('multer');
var upload = multer({ dest: process.cwd() + '/warehouse/tmp/' });
var mime = require('mime');
var sha1 = require('sha1');

var User = require('./../models/user');
var _ = require('lodash');

router.post('/upload/image', upload.single('image'), function (req, res, next) {
  var response = '';
  var extension = mime.extension(req.file.mimetype);
  if (extension === 'png' || extension === 'jpeg') {
    var response = '/warehouse/uploads/' + sha1(req.file.originalname) + '.' + extension;
    var destAbsolute = process.cwd() + response;
    fs.createReadStream(req.file.path).pipe(fs.createWriteStream(destAbsolute));
    fs.unlink(req.file.path);
  }
  res.send(response);
});

router.get('/verify-email/:uuid', function (req, res) {
  // FIXME, validation missing
  var uuid = req.params.uuid;
  User.findOne({'emails.verify': uuid}, function(err, user) {
    if (err || user === null) {
      res.status(400).send('Error');
    } else {
      var email = _.find(user.emails, {verify: uuid});
      email.valid = 1;
      email.verify = '';
      user.save(function(err) {
        res.redirect('/controlpanel/user/emails');
      });
    }
  });
});

module.exports = router
