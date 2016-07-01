var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');
var Media = require('./media');
var Event = require('./event');
var Performance = require('./performance');

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
  text: text,
  public: Boolean,
  users: [User],
  file: File, // Main image (if selected)
  medias: [Media], // 1 Media if video Multiple Media if image
  stats: { // Summary of data coming by gallery and media
    visits: Number,
    rates: {
      stars: String,
      tot_rate: String,
      sum_rate: String
    }
  },
  performances: [Performance], // Gallery can be connected to performances or events
  events: [Event] // Gallery can be connected to performances or events
}, {
  // FIXME maybe would be better to rename the collection
  collection: 'gallery'
});
