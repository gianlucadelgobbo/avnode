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

var getSectionInfo = function(param) {
  var section = {}
  switch (param) {
    case 'events':
      section.name = 'events';
      section.model = Event;
    break;
    case 'performances':
      section.name = 'performances';
      section.model = Performance;
    break;
    case 'playlists':
      section.name = 'playlists';
      section.model = Playlist;
    break;
    case 'footage':
      section.name = 'footage';
      section.model = Footage;
    break;
    case 'tvshows':
      section.name = 'tvshows';
      section.model = TVShow;
    break;
    case 'gallery':
      section.name = 'gallery';
      section.model = Gallery;
    break;
    case 'crews':
      section.name = 'crews';
      section.model = User;
    break;
  }
  return section;
}

exports.get = function get(req, res) {
  var query = { 'permalink': req.params.name };

  // FIXME
  User.findOne(query)
  .exec(function(error, user) {
    if (user !== null) {
      // FIXME TBD
      if (user.text !== null && user.text[getLocale()]) {
        user.text = user.text[getLocale()];
      } else {
        user.text = '';
      }
      res.render('user/show', {
        title: user.display_name,
        user: user,
        _h: _h
      });
    }
  });
};

exports.getSection = function get(req, res) {
  var query = { 'permalink': req.params.name };

  // FIXME
  User.findOne(query)
  .exec(function(error, user) {
    if (user !== null) {
      var section = getSectionInfo(req.params.section);
      res.render('user/sections/' + section.name, {
        title: user.display_name,
        user: user,
        _h: _h
      });
    }
  });
};

// FIXME feels like its the wrong route
exports.getSectionItem = function get(req, res) {
  var query = { 'permalink': req.params.name };
  User.findOne(query)
  .exec(function(error, user) {
    query = { 'permalink': req.params.item };
    var section = getSectionInfo(req.params.section);
    section.model.findOne(query)
    .exec(function(error, result) {
      if (section !== null) {
        res.render('user/sections/show', {
          title: user.display_name,
          section: section.name,
          user: user,
          result: result,
          _h: _h
        });
      }
    });
  });
};

exports.post = function post(req, res) {
  //FIXME
}
