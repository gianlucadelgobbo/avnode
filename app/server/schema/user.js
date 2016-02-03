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

var _ = require('lodash');

var UserSchema = new Schema({
  old_id: Number,
  permalink: {
    type: String
  },
  display_name: {
    type: String
  },
  name: String,
  surname: String,
  citizenship: String,
  birth_date: Date,
  locations: [{
    street: String,
    streetnumber: String,
    zip: String,
    city: String,
    country: String,
    latitude: Number,
    longitude: Number
  }],
  login: { type: String, required: true },
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
    public: {type: Boolean, default: false},
    valid: {type: Boolean, default: false},
    primary: {type: Boolean, default: false},
    verify: String,
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

UserSchema.virtual('primaryEmail').get(function () {
  return _.first(_.filter(this.emails, { 'primary': true }));
});

// FIXME
// Strange index behaviour, maybe mongoose has some issues
// autoIndex should be false in production
UserSchema.set('autoIndex', true);
UserSchema.index({permalink: 'text', display_name: 'text'});

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
