var mongoose = require('mongoose');
var footageSchema = require('../schema/footage');

module.exports = mongoose.model('Footage', footageSchema);

module.exports.isOwner = function (user, id) {
  var status = user.footages.some(function(footage) {
    return footage.equals(id);
  });
  return status;
};
