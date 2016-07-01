var Schema = require('mongoose').Schema;
var Category = require('./category');
var File = require('./file');
var User = require('./user');



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
  palinsetodate: [Date]
}, {collection: 'tvshow'});
