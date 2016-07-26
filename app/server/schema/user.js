var Schema = require('mongoose').Schema;
var File = require('./file');

var Footage = require('./footage');
var Eventsummary = require('./eventsummary');
var Gallerysummary = require('./gallerysummary');
var Performancesummary = require('./performancesummary');
var Playlist = require('./playlist');
var Tvshow = require('./tvshow');
var Usersummary = require('./usersummary');
var Categories = require('./category');
var Organization = require('./organization');
var Url = require('./url');

var Location = require('./location');

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
  is_public: {type: Boolean, default: true},
  file: File,
  activity: Number,
  stats: {
    members: Number,
    performances: Number,
    crews: Number,
    footage: Number,
    tvshows: Number,
    playlists: Number,
    events: Number,
    partnerships: Number,
    galleries: Number,
    friends: Number
  },
  locations: [Location],
  websites: [Url],
  text: Object,
  categories: [Categories],
  is_crew: Boolean,
  // is_crew = false
  name: String,
  surname: String,
  citizenship: String,
  birth_date: Date,
  gender: String,
  lang: String,
  login: { type: String, required: true },
  password: { type: String, required: true },
  crews: [Usersummary],
  emails: [{
    email: String,
    is_public: {type: Boolean, default: false},
    valid: {type: Boolean, default: false},
    primary: {type: Boolean, default: false},
    verify: String,
    mailingslists: []
  }],
  phonenumbers: [], // FIXME to be defined
  messengers: [], // FIXME to be defined
  connections: [], // FIXME to be defined

  // is_crew = true
  members: [Usersummary],
  is_organization: Boolean,
  organization: Organization,

  // RELATIONS:
  partnerships: [Eventsummary],
  events: [Eventsummary],
  footage: [Footage],
  galleries: [Gallerysummary],
  performances: [Performancesummary],
  playlists: [Playlist],
  tvshow: [Tvshow],
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

module.exports = UserSchema;
