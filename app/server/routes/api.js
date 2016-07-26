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

var validateParams = require('../validation.js').validateParams;
var Joi = require('joi');

var config = require('getconfig');

router.post('/upload/image', upload.single('image'), function (req, res) {
  var response = '';
  var extension = mime.extension(req.file.mimetype);
  if (extension === 'png' || extension === 'jpeg') {
    response = '/warehouse/uploads/' + sha1(req.file.originalname) + '.' + extension;
    var destAbsolute = process.cwd() + response;
    fs.createReadStream(req.file.path).pipe(fs.createWriteStream(destAbsolute));
    fs.unlink(req.file.path);
  }
  res.send(response);
});

router.get(
  '/validate/permalink/:permalink',
  validateParams({
    permalink: Joi.string().regex(new RegExp(config.regex.permalink)).required()
  }),
  function (req, res) {
    var query = { 'permalink': req.params.permalink };
    User.findOne(query)
    .exec(function(err, user) {
      if (user && req.user) {
        if (req.user.permalink === req.params.permalink) {
          res.status(404).send('Not found');
        } else {
          res.status(200).send('Found');
        }
      } else {
        res.status(404).send('Not found');
      }
    });
  }
);

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

router.get(
  '/search/users/:q',
  validateParams({
    q: Joi.string().regex(new RegExp(config.regex.permalink)).required()
  }),
  function (req, res) {
    // FIXME, validation missing
    var query = {
      '$text': {
        '$search': req.params.q
      }
    };
    User.find(query)
    .limit(5)
    .exec(function(err, users) {
      var data = [];
      if (users) {
        data = users.map(function(user) {
          return _.pick(user, ['display_name', 'permalink']);
        });
      }
      res.json(data);
    });
  }
);

module.exports = router;
