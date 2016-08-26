var Footage = require('../../models/footage');
var File = require('../../models/file');
var User = require('../../models/user');
var config = require('getconfig');
var mongoose = require('mongoose');
var _ = require('lodash');

exports.listGet = function get(req, res) {
  User.findOne({_id: req.user._id})
    .populate('footages')
    .exec(function(err, resolvedUser) {
      console.log('>>>>',resolvedUser.footages);
      res.render('controlpanel/footages/list', {
        config: config,
        user: req.user,
        footages: resolvedUser.footages
      });
    });
};

exports.createPost = function post(req, res) {
  var user = User.findOne({_id: req.user._id});
  var fileId = mongoose.Types.ObjectId();
  var footageId = mongoose.Types.ObjectId();
  var file = JSON.parse(req.body.file);

  var attachment = new File({
    _id: fileId,
    file: file.id,
    original_name: file.original_name,
    size: file.size,
    mimetype: file.type,
    duration: 129831,
    encoded: false
  });

  var footage = new Footage({
    _id: footageId,
    title: req.body.title,
    creation_date: new Date(),
    file: attachment
  }).save(function(err) {
    if (err) throw err;
    User.findByIdAndUpdate(req.user._id, { $addToSet: {'footages': footageId} }, { new: true }, function (err) {
      User.findOne({_id: req.user._id})
        .populate('footages')
        .exec(function(err, resolvedUser) {
          res.render('controlpanel/footages/list', {
            config: config,
            user: req.user,
            footages: resolvedUser.footages
          });
        });
    });
  });
}; 

exports.filePost = function(req, res) {
  var file = req.body.file;
  var data = {
    'files': JSON.parse(file)
  };
  res.status(200).json(file);
};

exports.deleteReq = function post(req,res) {
  var allowedToDelete = req.user.footages.some(function(footage) {
    return footage.equals(req.params.footage);
  });
  if (allowedToDelete === false) {
    res.status(403).send('Denied');
  } else {
    Footage.find({_id: req.params.footage}).remove(function(err, response) {
      if (err) throw err;
      User.findByIdAndUpdate(req.user._id, { $pull: {'footages': req.params.footage} }, { new: true }, function (err) {
        User.findOne({_id: req.user._id})
          .populate('footages')
          .exec(function(err, resolvedUser) {
            res.status(200).json({deleted: req.params.footage});
          });
      });
    });
  }
}
