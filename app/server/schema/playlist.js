var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');
var Footage = require('./footage');



module.exports = new Schema({
  old_id: Number,
  creation_date: Date,
  title: String,
  permalink: String,
  text: {},
  is_public: Boolean,
  users: [User],
  file: File, // Main image (if selected)
  footage: [Footage], // Multiple Footage
  stats: {
    visits: Number,
    likes: Number,
    shares: Number,
    downloads: Number
  }
});
