var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');
var Category = require('./category');
var Bookings = require('./bookings');
var Gallery = require('./gallery');

module.exports = new Schema({
  old_id: String,
  creation_date: Date,
  title: String,
  permalink: String,
  is_public: Boolean,
  users: [User],
  file: File,
  stats: {
    visits: Number,
    likes: Number,
    shares: Number
  },
  categories: [Category],
  duration: Number
});
