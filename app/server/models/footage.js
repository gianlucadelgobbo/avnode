var mongoose = require('mongoose');
var User = require('./user');
var footageSchema = require('../schema/footage');
var _ = require('lodash');

module.exports = mongoose.model('Footage', footageSchema);

module.exports.isOwner = function (user, id) {
  var status = user.footages.some(function(footage) {
    return footage.equals(id);
  });
  return status;
};

module.exports.isPermalinkUnique = function(user, permalink, cb) {
  var status = false;
  User.populate(user, {path: 'footages', select: 'permalink'}, function(err, _user) {
    if (err) return cb(err, null);
    status = !(_.some(_user.footages, {'permalink': permalink}));
    return cb(null, status);
  });
};
