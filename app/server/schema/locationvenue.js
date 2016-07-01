// locationvenue Schema
var Schema = require('mongoose').Schema;

module.exports = new Schema({
  name: String,
  // From here same as location
  formatted_address: String,
  street: String,
  streetnumber: String,
  city: String,
  zip: String,
  country: String,
  lat:Number,
  lng:Number
});
