var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');
var Category = require('./category');
var Schedule = require('./schedule');
var config = require('getconfig');

// Reuse the configured locales…
var subtitle = {};
config.locales.forEach(function(locale) {
  text[locale] = String;
  subtitle[locale] = String;
});

module.exports = new Schema({
  old_id: String,
  creation_date: Date,
  title: String,
  permalink: String,
  public: Boolean,
  users: [User],
  file: File,
  stats: {
    visits: Number,
    rates: {
      stars: String,
      tot_rate: String,
      sum_rate: String
    }
  },
  categories: [Category],
  subtitle: subtitle,
  schedule: [Schedule]
});
