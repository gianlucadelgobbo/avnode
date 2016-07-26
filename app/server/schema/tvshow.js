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
  is_public: Boolean,
  users: [User],
  file: File,
  stats: {
    visits: Number,
    likes: Number,
    shares: Number
  },
  categories: [Category],
  programming: [Date]
});
