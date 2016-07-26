var User = require('../../models/user');
var config = require('getconfig');

exports.listGet = function get(req, res) {
  res.render('controlpanel/footages/list', {
    config: config,
    user: req.user
  });
};
exports.filePost = function(req, res) {
  var file = req.body.file;
  var data = {
    'files': JSON.parse(file)
  };
  User.findByIdAndUpdate(req.user._id, { $addToSet: data }, { new: true }, function (err) {
    if (err) res.status(400).send('error');
    res.status(200).json({
      file: file
    });
  });
};
