// locationvenue Schema
var Schema = require('mongoose').Schema;
var Location = require('./location');

module.exports = new Schema({
  name: String,
  room: String,
  location: Location
});
