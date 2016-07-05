// locationvenuedatetime Schema
var Schema = require('mongoose').Schema;
var Venue = require('./venue');
var Category = require('./category');

module.exports = new Schema({
  date: Date,
  starttime: Date,
  endtime: Date,
  venue: Venue,
  // EVENTS ONLY
  categories:[Category],
  day:String,
  room:String
});