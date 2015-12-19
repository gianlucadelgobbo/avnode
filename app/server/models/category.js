var mongoose = require('mongoose');
var categorySchema = require('../schema/category');

module.exports = mongoose.model('Category', categorySchema);
