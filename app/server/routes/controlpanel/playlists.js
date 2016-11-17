var User = require('../../models/user'),
  mongoose = require('mongoose'),
  config = require('getconfig'),
  _ = require('lodash'),
  Playlist = require('../../models/playlist');

exports.listGet = function (req, res) {
  var opts = [
    { path: 'footages' }, 
    { path: 'playlists' }
  ];
  User.populate(req.user, opts, function(err, user) {
    if (err) throw err;
    res.render('controlpanel/playlists/list', {
      config: config,
      user: user
    });
  });
};

exports.createPost = function (req, res) {
  var playlistId = mongoose.Types.ObjectId();
  new Playlist({
    _id: playlistId,
    title: req.body.title,
    permalink: req.body.permalink,
    is_public: Boolean(req.body.is_public),
    footages: JSON.parse(req.body.footages)
  }).save(function(err) {
    if (err) throw err;
    User.findByIdAndUpdate(req.user._id, { $addToSet: {'playlists': playlistId} }, { new: true }, function (err) {
      if (err) throw err;
      // Go back to list view.
      res.redirect('/controlpanel/playlists');
    });
  });
};

exports.editGet = function(req, res) {
  var id = req.params.playlist;
  var owner = Playlist.isOwner(req.user, req.params.playlist);
  if (owner !== true || _.isUndefined(id)) {
    res.status(403).send('Access denied');
  } else {
    var opts = [
      { path: 'footages' }, 
      { path: 'playlists' }
    ];
    User.populate(req.user, opts, function(err, user) {
      if (err) throw err;
      Playlist.findById(id)
        .exec(function(err, playlist) {
          if (err) throw err;
          res.render('controlpanel/playlists/edit', {
            config: config,
            user: req.user,
            footages: user.footages,
            playlist: playlist
          });
        });
    });
  }
};

exports.updatePost = function(req, res) {
  var id = req.params.playlist;
  var owner = Playlist.isOwner(req.user, id);
  if (owner === true) {
    Playlist.findByIdAndUpdate(id, { 
      title: req.body.title,
      text: req.body.text,
      is_public: Boolean(req.body.is_public),
      footages: JSON.parse(req.body.footages),
      permalink: req.body.permalink
    }, function (err) {
      if (err) throw err;
      res.redirect('/controlpanel/playlists');
    });
  } else {
    res.status(403).send('Access denied');
  }
};

exports.deleteReq = function (req, res) {
  var playlist = req.params.playlist;
  var allowedToDelete = Playlist.isOwner(req.user, playlist);
  if (allowedToDelete === false) {
    res.status(403).send('Denied');
  } else {
    Playlist.find({_id: playlist}).remove(function(err) {
      if (err) throw err;
      User.findByIdAndUpdate(req.user._id, { $pull: {'playlists': playlist} }, { new: true }, function (err) {
        if (err) throw err;
        User.findOne({_id: req.user._id})
          .populate('playlists')
          .exec(function(err) {
            if (err) throw err;
            res.status(200).json({deleted: playlist});
          });
      });
    });
  }
};
