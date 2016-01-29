var User = require('../../models/user');
var _ = require('lodash');
var config = require('getconfig');
var _h = require('../../helper/index');
var uuid = require('uuid');
var Joi = require('joi');
var countries = require('country-list')().getData();
var flatten = require('flat');

exports.editUserPublicGet = function(req, res) {
  res.render('controlpanel/user/public', {
    config: config,
    result: req.user
  });
}
exports.editUserPublicSchema = {
  display_name: Joi.string().required(),
  permalink: Joi.string().required(),
  text: Joi.object().allow(config.locales),
  websites: Joi.array().items(
    Joi.string().uri()
  ),
  locations: Joi.array().items(
    Joi.object().keys({
      street: Joi.string().allow('').alphanum(),
      streetnumber: Joi.string().allow('').alphanum(),
      zip: Joi.string().allow('').alphanum(),
      city: Joi.string().allow('').alphanum(),
      country: Joi.string().allow('').alphanum(),
      lat: Joi.number().allow(''),
      lng: Joi.number().allow('')
    })
  )
};
exports.editUserPublicPost = function(req, res) {
  var data = _.defaults(req.body, {
    locations: [],
    websites: []
  });
  User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true }, function (err, user) {
    res.render('controlpanel/user/public', {
      config: config,
      result: user
    });
  });
}

exports.editUserImageGet = function(req, res) {
  res.render('controlpanel/user/image', {
    config: config,
    image: req.user.files[0],
    result: req.user
  });
}
exports.editUserImageSchema = {
  image: Joi.string().required()
};
exports.editUserImagePost = function(req, res) {
  var data = {
    'files.0.file': req.body.image
  };
  User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true }, function (err, user) {
    if (err) res.status(400).send('error');
    res.json({success: true});
  });
}

exports.editUserPasswordGet = function(req, res) {
  res.render('controlpanel/user/password', {
    config: config,
    result: req.user
  });
}
exports.editUserPasswordSchema = {
  password: Joi.string().min(8).required(),
  new_password: Joi.string().min(8).required(),
  new_password_confirm: Joi.any().valid(Joi.ref('new_password')).required()
};
exports.editUserPasswordPost = function(req, res) {
  req.user.comparePassword(req.body.password, function(err, isMatch) {
    if (isMatch) {
      User.findById(req.user._id, function(err, user) {
        user.password = req.body.new_password;
        user.save(function(err) {
          res.render('controlpanel/user/password', {
            config: config,
            alerts: [{
              type: 'success',
              msg: __('Password changed')
            }],
            result: user
          });
        });
      });
    } else {
      res.render('controlpanel/user/password', {
        config: config,
        alerts: [{
          type: 'danger',
          msg: __('Sorry, wrong password')
        }],
        result: req.user
      });
    }
  });
}

exports.editUserPrivateGet = function(req, res) {
  res.render('controlpanel/user/private', {
    config: config,
    countries: countries,
    result: req.user
  });
}
exports.editUserPrivateSchema = {
  name: Joi.string().allow(''),
  surname: Joi.string().allow(''),
  birth_date: Joi.date().allow(null).max('now').format('YYYY-MM-DD'),
  gender: Joi.string().allow(''),
  citizenship: Joi.string().allow(''),
  phonenumbers: Joi.array().items(
    Joi.string().required()
  )
};
exports.editUserPrivatePost = function(req, res) {
  var data = _.defaults(req.body, {
    phonenumbers: []
  });
  User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true }, function (err, user) {
    res.render('controlpanel/user/private', {
      config: config,
      countries: countries,
      result: user
    });
  });
}

exports.editUserEmailsGet = function(req, res) {
  res.render('controlpanel/user/emails', {
    config: config,
    result: req.user
  });
}
exports.editUserEmailsSchema = {
  primary_email: Joi.string().email().required(),
  emails: Joi.array().items(
    Joi.object().keys({
      email: Joi.string().email().required(),
      verify: Joi.boolean(),
      public: Joi.boolean(),
    })
  )
};
exports.editUserEmailsPost = function(req, res) {
  var newData = req.body;
  var existingData = req.user;
  var newEmails = {
    emails: []
  };
  newData.emails.forEach(function(newEmail, i) {
    _.defaults(newEmail, {
      public: false,
      primary: false,
    });
    if (newEmail.email === newData.primary_email) {
      newEmail.primary = true;
    }
    existingData.emails.forEach(function(existingEmail, i) {
      if (existingEmail.email === newEmail.email) {
        newEmail = _.merge(existingEmail, newEmail);
      }
    });
    if (newEmail.verify) {
      newEmail.verify = uuid.v4();
      _h.mail.sendVerificationMail(newEmail.email, newEmail.verify);
    }
    newEmails.emails.push(newEmail);
  });
  User.findByIdAndUpdate(req.user._id, { $set: newEmails }, { new: true }, function (err, user) {
    res.render('controlpanel/user/emails', {
      config: config,
      result: user
    });
  });
}
