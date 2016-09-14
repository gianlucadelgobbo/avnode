var mongoose = require('mongoose');
var File = require('./file');

module.exports = new mongoose.Schema({
  old_id: Number,
  creation_date: {
    type: Date,
    default: new Date()
  },
  title: String,
  permalink: String,
  text: {},
  is_public: {
    type: Boolean,
    default: false
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  file: File, // Main image (if selected)
  footages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Footage'
  }], // Multiple Footage
  stats: {
    visits: Number,
    likes: Number,
    shares: Number,
    downloads: Number
  }
});
