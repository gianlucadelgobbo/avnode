// location Schema
var Schema = require('mongoose').Schema;

module.exports = new Schema({
  formatted_address: String,
  street: String,
  streetnumber: String,
  city: String,
  zip: String,
  country: String,
  lat:Number,
  lng:Number
});
