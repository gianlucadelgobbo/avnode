var express = require('express');
var router = express.Router();
var config = require('getconfig');

var fs = require('fs');
var path = require('path');

var multer = require('multer');
var upload = multer({ dest: config.sitepath + '/warehouse/tmp/' });
var mime = require('mime');
var sha1 = require('sha1');

var User = require('./../models/user');
var _ = require('lodash');

var validateParams = require('../validation.js').validateParams;
var Joi = require('joi');

var multipart = require('connect-multiparty');
var resumable = require('../modules/resumable.js')('/tmp/avnode-uploads/');
var uuid = require('uuid');
router.use(multipart());

router.post('/upload/image', upload.single('image'), function (req, res) {
  var response = '';
  var extension = mime.extension(req.file.mimetype);
  if (extension === 'png' || extension === 'jpeg') {
    response = '/warehouse/uploads/' + sha1(req.file.originalname) + '.' + extension;
    var destAbsolute = config.sitepath + response;
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
      if (req.user && req.user.permalink === req.params.permalink) {
        res.status(404).send('Not found');
      } else if (user) {
        res.status(200).send('Found');
      } else {
        res.status(404).send('Not found');
      }
    });
  }
);

router.post('/upload/files', function(req, res){
  var destination = config.sitepath + '/warehouse/uploads/videos/';
  if (!fs.existsSync(destination)){
    fs.mkdirSync(destination);
  }
  resumable.post(req, function(status, filename, original_filename, identifier){
    if (status === 'done') {
      // FIXME Path.extname can be something different than the acutal file extension.
      var id = uuid.v4();
      var uniqueFileName = id + path.extname(filename);
      //when all chunks uploaded, then createWriteStream to /uploads folder with filename
      var stream = fs.createWriteStream(destination + uniqueFileName);
      //stitches the file chunks back together to create the original file.
      resumable.write(identifier, stream);
      stream.on('close', function(){
        //FIXME figure out why event gets called three times…
        //delete chunks after original file is re-created.
        resumable.clean(identifier);
      });
    }
    res.send({
      id: id,
      fileName: uniqueFileName,
      status: status
    });
  });
});

// Handle status checks on chunks through Resumable.js
router.get('/upload/files', function(req, res){
  resumable.get(req, function(status){
    res.send((status == 'found' ? 200 : 404), status);
  });
});

router.get('/download/:identifier', function(req, res){
  resumable.write(req.params.identifier, res);
});

router.get(
    '/validate/permalink/:permalink',
    validateParams({
      permalink: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
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

router.get(
  '/validate/login/:email',
  validateParams({
    email: Joi.string().email().required(),
  }),
  function (req, res) {
    var email = req.params.email;
    User.findOne({'login': email}, function(err, user) {
      if (user === null) {
        res.status(200).send('Found');
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
      user.save(function() {
        res.redirect('/controlpanel/user/emails');
      });
    }
  });
});

router.get('/verify-user/:uuid', function (req, res) {
  // FIXME, validation missing
  var uuid = req.params.uuid;
  User.findOne({'verify': uuid}, function(err, user) {
    if (err || user === null) {
      res.status(400).send('Error');
    } else {
      user.confirmed = true;
      user.primaryEmail.valid = true;
      user.save(function() {
        res.redirect('/controlpanel/login');
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
        res.json(data);
      }
    });
  }
);
router.get('/video/:id/poster', function(req,res) {
  try {
    res.sendFile(config.sitepath + '/warehouse/uploads/videos/' + req.params.id);
  }
  catch (e) {
    res.sendStatus(404);
  }
});
router.get('/video/:id', function(req,res) {
  try {
    res.sendFile(config.sitepath + '/warehouse/uploads/videos/' + req.params.id + '.mp4');
  }
  catch (e) {
    res.sendStatus(404);
  }
});
router.get('/video/:id/mobile', function(req,res) {
  try {
    res.sendFile(config.sitepath + '/warehouse/uploads/videos/' + req.params.id + '-mobile.mp4');
  }
  catch (e) {
    res.sendStatus(404);
  }
});
module.exports = router;
