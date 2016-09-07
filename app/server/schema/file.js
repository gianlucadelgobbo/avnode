var Schema = require('mongoose').Schema;

module.exports = new Schema({
  uuid: String,
  name: String,
  original_name: String,
  mimetype: String,
  size: Number,
  duration: {type: Number, default: 0},
  metadata: Object,
  previews: Array,
  status: {
    preview: {type: Boolean, default: false},
    transcoded: {type: Boolean, default: false},
    mobile: {type: Boolean, default: false}
  }
});
