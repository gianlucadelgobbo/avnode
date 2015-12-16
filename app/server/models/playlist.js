var mongoose = require('mongoose');
var playlistSchema = require('../schema/playlist');

module.exports = mongoose.model('Playlist', playlistSchema);
