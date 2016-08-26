var Schema = require('mongoose').Schema;
var File = require('./file');
var User = require('./user');
var Playlist = require('./playlist');
var Tag = require('./tag');
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
  text: {},
  is_public: Boolean,
  file: File, //always one
  preview_file: String, //FIXME put it inside file
  tags: [Tag],
  stats: {
    visits: Number,
    downloads: Number,
    likes: Number,
    shares: Number
  },
  playlists: [Playlist]
}, {collection: 'footage'});
