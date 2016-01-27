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
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  old_id: Number,
  permalink: String,
  display_name: String,
  name: String,
  surname: String,
  citizenship: String,
  birth_date: Date,
  locations: {
    latitude: Number,
    longitude: Number
  },
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
  emails: [{
    email: String,
    public: Boolean,
    valid: Boolean,
    primary: Boolean,
    mailingslists: []
  }],
  websites: [],
  phonenumbers: [],
  mailinglists: [],
  members: [],
  text: Object,
  stats: {
    // FIXME
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = UserSchema
