var Schema = require('mongoose').Schema;
var File = require('./file');

var Footage = require('./footage');
var Eventsummary = require('./eventsummary');
var Gallery = require('./gallery');
var Performancesummary = require('./performancesummary');
var Playlist = require('./playlist');
var Tvshow = require('./tvshow');
var User = require('./user');
var Categories = require('./categories');
var Organization = require('./organization');

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
  public: {type: Boolean, default: true},
  files: [File],
  websites: [], // FIXME to be defined Socials?
  text: Object,
  activity: Number,
  stats: {
    // FIXME
  },
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
  crews: [User],
  locations: [Location],
  emails: [{
    email: String,
    public: {type: Boolean, default: false},
    valid: {type: Boolean, default: false},
    primary: {type: Boolean, default: false},
    verify: String,
    mailingslists: []
  }],
  phonenumbers: [], // FIXME to be defined
  messengers: [], // FIXME to be defined

  // is_crew = true
  members: [User],
  memberslocations: [Location],
  organization: Organization,

  // RELATIONS:
  partnerships: [Eventsummary],
  events: [Eventsummary],
  footage: [Footage],
  gallery: [Gallery],
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

module.exports = UserSchema
