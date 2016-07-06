var Schema = require('mongoose').Schema;
var File = require('./file');
var Url = require('./url');
var Categories = require('./category');
var Location = require('./location');

var UserSchema = new Schema({
  old_id: Number,
  permalink: {
    type: String
  },
  display_name: {
    type: String
  },
  is_public: {type: Boolean, default: true},
  file: File,
  activity: Number,
  stats: {
    // FIXME
  },
  locations: [Location],
  websites: [Url],
  categories: [Categories],
});

module.exports = UserSchema
