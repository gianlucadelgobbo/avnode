var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');
var Venue = require('./venue');




module.exports = new Schema({
  old_id: String,
  creation_date: Date,
  title: String,
  permalink: String,
  text: {},
  users: [User],
  file: File,  //always one
  tagged: [], // FIXME
  venue : Venue,
  stats: { // Summary of data coming by gallery and
    visits: Number,
    likes: Number,
    shares: Number
  }
});
