var Errors = require('../errors');
var config = require('getconfig');
var User = require('../models/user');
var Footage = require('../models/footage');
var Event = require('../models/event');
var Gallery = require('../models/gallery');
var Performance = require('../models/performance');
var Playlist = require('../models/playlist');
var Tvshow = require('../models/tvshow');

var _h = require('../helper/index');

exports.getUser = function get(req, res) {
  console.log('JABSJDAJSKBDJSADLKASJKDN');
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
        user: req.user,
        _h: _h
      });
    }
  });
};

var localsList = function(user, req, sez) {
  return {
    title: config.sections[sez].title + ' | ' + user.display_name,
    performer: user,
    section: sez,
    user: req.user,
    _h: _h
  };
};

exports.getUserEvents = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/events', localsList(user, req, 'events'));
  });
};

exports.getUserPerformances = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/performances', localsList(user, req, 'performances'));
  });
};

exports.getUserTvshows = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
    .exec(function(error, user) {
      res.render('user/sections/tvshows', localsList(user, req, 'tvshows'));
    });
};

exports.getUserFootages = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
    .exec(function(error, user) {
      res.render('user/sections/footages', localsList(user, req, 'footage'));
    });
};

exports.getUserPlaylists = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/playlists', localsList(user, req, 'playlists'));
  });
};


exports.getUserGalleries = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/galleries', localsList(user, req, 'galleries'));
  });
};

exports.getUserCrews = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/crews', localsList(user, req, 'crews'));
  });
};

var localsDetail = function(user, result, req, sez) {
  return {
    title: result.title + ' | ' +  config.sections[sez].title + ' | ' + user.display_name,
    result: result,
    section: sez,
    performer: user,
    user: req.user,
    _h: _h
  };
};

exports.getUserEvent = function get(req, res, next) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    if (error) return next(new Errors.Internal());
    if (!user) return next(new Errors.NotFound('User not found'));
    var query = { 'permalink': req.params.event };
    Event
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/details/event', localsDetail(user, result, req, 'events'));
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
      res.render('user/details/performance', localsDetail(user, result, req, 'performances'));
    });
  });
};

exports.getUserTvshow = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
    .findOne(query)
    .exec(function(error, user) {
      var query = { 'permalink': req.params.tvshow };
      Tvshow
        .findOne(query)
        .exec(function(error, result) {
          res.render('user/details/tvshow', localsDetail(user, result, req, 'tvshows'));
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
          res.render('user/details/footage', localsDetail(user, result, req, 'footage'));
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
      res.render('user/details/playlist', localsDetail(user, result, req, 'playlists'));
    });
  });
};

exports.getUserGallery = function get(req, res) {
  console.log(req.params);
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.gallery };
    Gallery
    .findOne(query)
    .exec(function(error, result) {
      var ld = localsDetail(user, result, req, 'galleries');
      res.render('user/details/gallery', ld);
    });
  });
};

/*
exports.getUserCrew = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.crew };
    User
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/sections/show', localsDetail(user, result, req, "performances"));
    });
  });
};
*/
exports.participateAtUserEvent = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function() {
    var query = { 'permalink': req.params.event };
    Event
    .findOne(query)
    .exec(function() {
      // FIXME
      res.send('FIXME');
    });
  });
};
