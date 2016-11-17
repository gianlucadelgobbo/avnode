var Schema = require('mongoose').Schema;
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
  text: text,
  is_public: Boolean,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  file: File, // Main image (if selected)
  medias: [Media], // 1 Media if video Multiple Media if image
  stats: { // Summary of data coming by gallery and media
    visits: Number,
    likes: Number,
    shares: Number
  },
  counters: {
    audio: Number,
    img: Number,
    video: Number
  },
  performances: [Performancesummary], // Gallery can be connected to performances or events
  events: [Eventsummary] // Gallery can be connected to performances or events
});
