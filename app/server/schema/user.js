var Schema = require('mongoose').Schema;
var File = require('./file');

var Footage = require('./footage');
var Event = require('./event');
var Gallery = require('./gallery');
var Performance = require('./performance');
var Playlist = require('./playlist');
var TVShow = require('./tvshow');
var User = require('./user');

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  old_id: Number,
  permalink: String,
  display_name: String,
  locations: Array,
  login: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  crews: [User],
  footage: [Footage],
  events: [Event],
  gallery: [Gallery],
  performances: [Performance],
  playlists: [Playlist],
  tvshow: [TVShow],
  files: [File],
  emails: [],
  mailinglists: [],
  members: [],
  text: Object,
  stats: {
    // FIXME
  }
});

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = UserSchema
