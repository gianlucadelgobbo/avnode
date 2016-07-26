var User = require('../../models/user');
var Errors = require('../../errors');
var config = require('getconfig');
var _h = require('../../helper/index');
var uuid = require('uuid');
var Joi = require('joi');
var countries = require('country-list')().getData();

exports.publicGet = function(req, res) {
  res.render('controlpanel/signup/signup', {
    config: config,
    countries: countries,
    result: {}
  });
};
exports.publicSchemaPost = {
  gender: Joi.string().allow(''),
  name: Joi.string().allow(''),
  surname: Joi.string().allow(''),
  birth_date: Joi.date().allow('').max('now').format('YYYY-MM-DD'),
  citizenship: Joi.string().allow(''),
  emails: Joi.array().items(
    Joi.object().keys({
      email: Joi.string().email().required(),
      verify: Joi.boolean(),
      public: Joi.boolean(),
    })
  ),
  new_password: Joi.string().min(8).required(),
  new_password_confirm: Joi.any().valid(Joi.ref('new_password')).required(),
  display_name: Joi.string().required(),
  permalink: Joi.string().alphanum().required()
};
exports.publicPost = function(req, res, next) {
  var user = req.body;
  user.login = user.emails[0].email;
  user.confirmed = false;
  user.verify = uuid.v4();
  user.password = user.new_password;
  delete user.new_password;
  delete user.new_password_confirm;
  User.create(user, function (err, user) {
    if (err) return next(new Errors.Internal(err));
    _h.mail.sendUserVerificationMail(user.email, user.verify);
    res.render('controlpanel/signup/ok', {
      config: config
    });
  });
};
