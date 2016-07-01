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
  public: Boolean,
  users: [User],
  file: File, // Main image (if selected)
  footage: [Footage], // Multiple Footage
  stats: {
    visits: Number,
    rates: {
      stars: String,
      tot_rate: String,
      sum_rate: String
    },
    downloads: Number
  }
});
