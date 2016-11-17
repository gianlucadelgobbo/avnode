var Schema = require('mongoose').Schema;
var File = require('./file');
var config = require('getconfig');

// Reuse the configured locales…
var text = {};
config.locales.forEach(function (locale) {
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
  footages: [{
    type: Schema.Types.ObjectId,
    ref: 'Footage'
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Footage'
  }],
  file: File,
  stats: {
    visits: Number,
    likes: Number,
    shares: Number
  },
  programming: [Date]
});
