var Schema = require('mongoose').Schema;






module.exports = new Schema({
  tag: String,
  tot: Number,
  required: Boolean,
  exclusive: Boolean
});
