var Schema = require('mongoose').Schema;

module.exports = new Schema({
  name: String,
  street: String,
  city: String,
  zip: String,
  country: String,
  lat:Number,
  lng:Number
});
