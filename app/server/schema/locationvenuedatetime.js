var Schema = require('mongoose').Schema;

module.exports = new Schema({
  startime: Date,
  endtime: Date,
  name: String,
  street: String,
  city: String,
  zip: String,
  country: String,
  lat:Number,
  long:Number
});
