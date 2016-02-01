var User = require('../../models/user');
var config = require('getconfig');
var Joi = require('joi');
var _ = require('lodash');

exports.listGet = function get(req, res) {
  res.render('controlpanel/crews/list', {
    config: config,
    result: req.user
  });
};

exports.publicSchemaGet = {
  crew: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.publicGet = function(req, res) {
  var query = { 'permalink': req.params.crew };
  User.findOne(query)
  .exec(function(err, crew) {
    res.render('controlpanel/crews/public', {
      config: config,
      result: crew
    });
  });
}
exports.publicSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required(),
  display_name: Joi.string().required(),
  permalink: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
  text: Joi.object().allow(config.locales),
  websites: Joi.array().items(
    Joi.string().uri()
  )
};
exports.publicPost = function(req, res) {
  var data = _.defaults(req.body, {
    websites: []
  });
  User.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, crew) {
    res.render('controlpanel/crews/public', {
      config: config,
      result: crew
    });
  });
}

exports.imageSchemaGet = {
  crew: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.imageGet = function(req, res) {
  var query = { 'permalink': req.params.crew };
  User.findOne(query)
  .exec(function(err, crew) {
    res.render('controlpanel/crews/image', {
      config: config,
      result: crew
    });
  });
}
exports.imageSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required()
};
exports.imagePost = function(req, res) {
  var data = _.defaults(req.body, { });
  User.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, crew) {
    res.render('controlpanel/crews/image', {
      config: config,
      result: crew
    });
  });
}

exports.membersSchemaGet = {
  crew: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.membersGet = function(req, res) {
  var query = { 'permalink': req.params.crew };
  User.findOne(query)
  .exec(function(err, crew) {
    res.render('controlpanel/crews/members', {
      config: config,
      result: crew
    });
  });
}
exports.membersSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required()
};
exports.membersPost = function(req, res) {
  var data = _.defaults(req.body, {
  });
  User.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, crew) {
    res.render('controlpanel/crews/members', {
      config: config,
      result: crew
    });
  });
}
