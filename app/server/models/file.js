var mongoose = require('mongoose');
var fileSchema = require('../schema/file');

module.exports = mongoose.model('File', fileSchema);
