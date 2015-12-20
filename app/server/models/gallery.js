var mongoose = require('mongoose');
var gallerySchema = require('../schema/gallery');

module.exports = mongoose.model('Gallery', gallerySchema);
