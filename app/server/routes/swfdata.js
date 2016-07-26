var config = require('getconfig');
var User = require('../models/user');
var Footage = require('../models/footage');

var _h = require('../helper/index');

var localsDetail = function(user, result, req, sez) {
  console.log(config);
  return {
    title: result.title + ' | ' +  config.sections[sez].title + ' | ' + user.display_name,
    result: result,
    config: config,
    section: sez,
    performer: user,
    user: req.user,
    _h: _h
  };
};

exports.get = function get(req, res) {
  var query = { 'permalink': req.params.user };
  console.log(req.params);
  User
    .findOne(query)
    .exec(function(error, user) {
      var query = { 'permalink': req.params.footage };
      console.log(query);
      Footage
        .findOne(query)
        .exec(function(error, result) {
          res.render('swfdata', localsDetail(user, result, req, 'footage'));
        });
    });
};
