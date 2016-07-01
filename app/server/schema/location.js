var Schema = require('mongoose').Schema;

module.exports = new Schema({
  street: String,
  city: String,
  zip: String,
  country: String,
  lat:Number,
  lng:Number
});
