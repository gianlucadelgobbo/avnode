// locationvenuedatetime Schema
var Schema = require('mongoose').Schema;
var Venue = require('./venue');

module.exports = new Schema({
  starttime: Date,
  endtime: Date,
  venue: Venue
});