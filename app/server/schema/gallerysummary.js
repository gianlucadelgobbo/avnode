var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');
var Media = require('./media');
var Eventsummary = require('./eventsummary');
var Performancesummary = require('./performancesummary');

var config = require('getconfig');

// Reuse the configured locales…
var text = {};

config.locales.forEach(function(locale) {
  text[locale] = String;

});

module.exports = new Schema({
  old_id: String,
  creation_date: Date,
  title: String,
  permalink: String,
  is_public: Boolean,
  users: [User],
  file: File, // Main image (if selected)
  stats: { // Summary of data coming by gallery and media
    visits: Number,
    likes: Number,
    shares: Number
  },
  counters: {
    audio: Number,
    img: Number,
    video: Number
  }
});
