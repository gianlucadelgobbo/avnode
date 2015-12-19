var mongoose = require('mongoose');
var footageSchema = require('../schema/footage');

module.exports = mongoose.model('Footage', footageSchema);
