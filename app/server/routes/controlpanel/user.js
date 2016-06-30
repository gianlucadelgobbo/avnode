var User = require('../../models/user');
var _ = require('lodash');
var config = require('getconfig');
var _h = require('../../helper/index');
var uuid = require('uuid');
var Joi = require('joi');
var countries = require('country-list')().getData();
var flatten = require('flat');

exports.publicGet = function(req, res) {
  console.log(req.user.locations);
  if (req.user.locations.length === 0) {
      req.user.locations.push({street: ''})
  }
  res.render('controlpanel/user/public', {
    config: config,
    result: req.user
  });
}
exports.publicSchemaPost = {
  display_name: Joi.string().required(),
  permalink: Joi.string().alphanum().required(),
  text: Joi.object().allow(config.locales),
  websites: Joi.array().items(
    Joi.string().uri()
  ),
  locations: Joi.array().items(
    Joi.object().keys({
      formatted_address: Joi.string().allow(''),
      street: Joi.string().allow(''),
      streetnumber: Joi.string().allow(''),
      zip: Joi.string().allow(''),
      city: Joi.string().required(),
      country: Joi.string().required(),
      lat: Joi.number().allow(''),
      lng: Joi.number().allow('')
    })
  )
};
exports.publicPost = function(req, res) {
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

exports.imageGet = function(req, res) {
  res.render('controlpanel/user/image', {
    config: config,
    image: req.user.files[0],
    result: req.user,
    user: req.user
  });
}
exports.imageSchemaPost = {
  image: Joi.string().required()
};
exports.imagePost = function(req, res) {
  var data = {
    'files.0.file': req.body.image
  };
  User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true }, function (err, user) {
    if (err) res.status(400).send('error');
    res.json({success: true});
  });
}

exports.passwordGet = function(req, res) {
  res.render('controlpanel/user/password', {
    config: config,
    result: req.user,
    user: req.user
  });
}
exports.passwordSchemaPost = {
  password: Joi.string().min(8).required(),
  new_password: Joi.string().min(8).required(),
  new_password_confirm: Joi.any().valid(Joi.ref('new_password')).required()
};
exports.passwordPost = function(req, res) {
  req.user.comparePassword(req.body.password, function(err, isMatch) {
    if (isMatch) {
      User.findById(req.user._id, function(err, user) {
        user.password = req.body.new_password;
        user.save(function(err) {
          _h.mail.sendPasswordChangedMail(user.primaryEmail.email);
          res.render('controlpanel/user/password', {
            config: config,
            alerts: [{
              type: 'success',
              msg: __('Password changed')
            }],
            result: user,
            user: user
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
        result: req.user,
        user: req.user
      });
    }
  });
}

exports.privateGet = function(req, res) {
  res.render('controlpanel/user/private', {
    config: config,
    countries: countries,
    result: req.user,
    user: req.user
  });
}
exports.privateSchemaPost = {
  name: Joi.string().allow(''),
  surname: Joi.string().allow(''),
  birth_date: Joi.date().allow('').max('now').format('YYYY-MM-DD'),
  gender: Joi.string().allow(''),
  citizenship: Joi.string().allow(''),
  phonenumbers: Joi.array().items(
    Joi.string().required()
  )
};
exports.privatePost = function(req, res) {
  var data = _.defaults(req.body, {
    phonenumbers: []
  });
  User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true }, function (err, user) {
    res.render('controlpanel/user/private', {
      config: config,
      countries: countries,
      result: user,
      user: req.user
    });
  });
}

exports.emailsGet = function(req, res) {
  res.render('controlpanel/user/emails', {
    config: config,
    result: req.user,
    user: req.user
  });
}
exports.emailsSchemaPost = {
  primary_email: Joi.string().email().required(),
  emails: Joi.array().items(
    Joi.object().keys({
      email: Joi.string().email().required(),
      verify: Joi.boolean(),
      public: Joi.boolean(),
    })
  )
};
exports.emailsPost = function(req, res) {
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
      result: user,
      user: user
    });
  });
}

exports.connectionsGet = function(req, res) {
  res.render('controlpanel/user/connections', {
    config: config,
    result: req.user,
    user: req.user
  });
}
exports.connectionsSchemaPost = {
};
exports.connectionsPost = function(req, res) {
  var data = _.defaults(req.body, {
  });
  User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true }, function (err, user) {
    res.render('controlpanel/user/connections', {
      config: config,
      result: user,
      user: user
    });
  });
}
