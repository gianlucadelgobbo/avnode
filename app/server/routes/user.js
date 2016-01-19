var config = require('getconfig');
var User = require('../models/user');
var Footage = require('../models/footage');
var Event = require('../models/event');
var Gallery = require('../models/gallery');
var Performance = require('../models/performance');
var Playlist = require('../models/playlist');
var TVShow = require('../models/tvshow');
var _ = require('lodash');

var _h = require('../helper/index');

exports.getUser = function get(req, res) {
  var query = { 'permalink': req.params.user };
  console.log('get user', query);
  // FIXME
  User.findOne(query)
  .exec(function(err, user) {
    if (user) {
      // FIXME TBD
      if (user.text !== null && user.text[getLocale()]) {
        user.text = user.text[getLocale()];
      } else {
        user.text = '';
      }
      res.render('user/show', {
        title: user.display_name,
        performer: user,
        _h: _h
      });
    }
  });
};

var localsList = function(user) {
  return {
    title: user.display_name,
    performer: user,
    _h: _h
  }
}

exports.getUserEvents = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/events', localsList(user));
  });
}

exports.getUserPerformances = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/performances', localsList(user));
  });
}

exports.getUserPlaylists = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/playlists', localsList(user));
  });
}

exports.getUserFootages = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/footage', localsList(user));
  });
}

exports.getUserGalleries = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/gallery', localsList(user));
  });
}

exports.getUserCrews = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/crews', localsList(user));
  });
}

var localsDetail = function(user, result) {
  return {
    title: user.display_name,
    result: result,
    performer: user,
    _h: _h
  }
}

exports.getUserEvent = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.event };
    Event
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/events/show', localsDetail(user, result));
    });
  });
};

exports.getUserPerformance = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.performance };
    Performance
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/sections/show', localsDetail(user, result));
    });
  });
};

exports.getUserPlaylist = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.playlist };
    Playlist
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/sections/show', localsDetail(user, result));
    });
  });
};

exports.getUserFootage = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.footage };
    Footage
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/sections/show', localsDetail(user, result));
    });
  });
};

exports.getUserGallery = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.gallery };
    Gallery
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/sections/show', localsDetail(user, result));
    });
  });
};

exports.getUserCrew = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.crew };
    User
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/sections/show', localsDetail(user, result));
    });
  });
};

exports.post = function post(req, res) {
  //FIXME
}
