var mongoose = require('mongoose');
var tvshowSchema = require('../schema/tvshow');

module.exports = mongoose.model('Tvshow', tvshowSchema);
