var Schema = require('mongoose').Schema;
var File = require('./file');

var Footage = require('./footage');
var Event = require('./event');
var Gallery = require('./gallery');
var Performance = require('./performance');
var Playlist = require('./playlist');
var TVShow = require('./tvshow');
var User = require('./user');

module.exports = new Schema({
  old_id: Number,
  permalink: String,
  display_name: String,
  locations: Array,
  // FIXME
  crews: [User],
  footage: [Footage],
  events: [Event ],
  gallery: [Gallery],
  performances: [Performance],
  playlists: [Playlist],
  tvshow: [TVShow],
  files: [File],
  text: Object,
  stats: {
    // FIXME
  }
});
