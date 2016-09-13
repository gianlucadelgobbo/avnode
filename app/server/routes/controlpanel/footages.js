var Footage = require('../../models/footage');
var File = require('../../models/file');
var User = require('../../models/user');
var config = require('getconfig');
var mongoose = require('mongoose');
var mime = require('mime');
var _ = require('lodash');
var Queue = require('../../modules/queue');

exports.listGet = function get(req, res) {
  // In case a new one will be created
  var footageId = mongoose.Types.ObjectId();
  User.findOne({_id: req.user._id})
    .populate('footages')
    .exec(function(err, resolvedUser) {
      res.render('controlpanel/footages/list', {
        config: config,
        user: req.user,
        footages: resolvedUser.footages,
        newFootageId: footageId
      });
    });
};

exports.createPost = function post(req, res) {
  var footageId = mongoose.Types.ObjectId(req.body.id);
  if (req.body.file) {
    var file = JSON.parse(req.body.file);
    var attachment = new File({
      _id: mongoose.Types.ObjectId(),
      uuid: file.uuid,
      name: file.name,
      original_name: file.original_name,
      size: file.size,
      mimetype: mime.lookup(file.name),
    });

    Queue.add({
      type: 'thumbnail',
      file: file, 
      footage: footageId
    });
    Queue.add({
      type: 'transcode',
      file: file, 
      footage: footageId
    });
  }
  new Footage({
    _id: footageId,
    title: req.body.title,
    creation_date: new Date(),
    file: attachment || null 
  }).save(function(err) {
    if (err) throw err;
    User.findByIdAndUpdate(req.user._id, { $addToSet: {'footages': footageId} }, { new: true }, function (err) {
      if (err) throw err;
      // Go back to list view.
      res.redirect('/controlpanel/footage');
    });
  });
}; 

exports.updatePost = function(req, res) {
  var id = req.params.footage;
  var owner = Footage.isOwner(req.user, req.params.footage);
  if (owner === true) {
    var attachment = null;
    var file = JSON.parse(req.body.file);
    // Some changes to file?
    if (file !== null && file._id) {
      attachment = file;
    } else if (file !== null) {
      attachment = new File({
        _id: mongoose.Types.ObjectId(),
        uuid: file.uuid,
        name: file.name,
        original_name: file.original_name,
        size: file.size,
        mimetype: file.type,
        duration: 129831,
        encoded: false
      });
    }

    Footage.findByIdAndUpdate(id, { 
      title: req.body.title,
      file: attachment
    }, function (err) {
      if (err) throw err;
      res.redirect('/controlpanel/footage');
    });
  } else {
    res.status(403).send('Access denied');
  }
};

exports.editGet = function(req, res) {
  var id = req.params.footage;
  var owner = Footage.isOwner(req.user, req.params.footage);
  if (owner !== true || _.isUndefined(id)) {
    res.status(403).send('Access denied');
  } else {
    Footage.findById(id).exec(function(err, footage) {
      if (err) throw err;
      res.render('controlpanel/footages/edit', {
        config: config,
        user: req.user,
        footage: footage
      });
    });
  }
};

exports.filePost = function(req, res) {
  var file = JSON.parse(req.body.file);
  res.status(200).json(JSON.stringify(file));
};

exports.deleteReq = function post(req,res) {
  var allowedToDelete = Footage.isOwner(req.user, req.params.footage);
  if (allowedToDelete === false) {
    res.status(403).send('Denied');
  } else {
    Footage.find({_id: req.params.footage}).remove(function(err) {
      if (err) throw err;
      User.findByIdAndUpdate(req.user._id, { $pull: {'footages': req.params.footage} }, { new: true }, function (err) {
        if (err) throw err;
        User.findOne({_id: req.user._id})
          .populate('footages')
          .exec(function(err) {
            if (err) throw err;
            res.status(200).json({deleted: req.params.footage});
          });
      });
    });
  }
};
