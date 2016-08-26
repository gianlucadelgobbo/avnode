var Schema = require('mongoose').Schema;

module.exports = new Schema({
  file: String,
  original_name: String,
  mimetype: String,
  preview: String,
  size: Number,
  duration: Number,
  encoded:Boolean
});
