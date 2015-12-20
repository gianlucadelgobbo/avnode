var config = require('getconfig');
var User = require('../models/user');
var _ = require('lodash');

var _h = require('../helper/index');

exports.get = function get(req, res) {
	var section = 'performer';
  var query = { 'permalink': req.params.name };

  // FIXME
  User.findOne(query)
  .exec(function(error, user) {
    if (user !== null) {
      // FIXME TBD
      if (user.text[getLocale()]) {
        user.text = user.text[getLocale()];
      } else {
        user.text = user.text['en'];
      }
      res.render('user/show', {
        title: user.display_name,
        user: user,
        _h: _h
      });
    }
  });
};

exports.post = function post(req, res) {
  //FIXME
}
