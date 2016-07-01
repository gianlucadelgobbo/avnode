var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');
var Category = require('./category');
var Bookings = require('./bookings');
var Gallery = require('./gallery');

var config = require('getconfig');

// Reuse the configured locales…
var text = {};
var tech_art = {};
var tech_req = {};
config.locales.forEach(function(locale) {
  text[locale] = String;
  tech_art[locale] = String;
  tech_req[locale] = String;
});

module.exports = new Schema({
  old_id: String,
  creation_date: Date,
  title: String,
  permalink: String,
  text: text,
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
  duration: Number,
  tech_art: tech_art,
  tech_req: tech_req,
  galleries: [Gallery],
  bookings: [Bookings]
});
