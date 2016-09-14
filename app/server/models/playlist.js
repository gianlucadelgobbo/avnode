var mongoose = require('mongoose');
var playlistSchema = require('../schema/playlist');

module.exports = mongoose.model('Playlist', playlistSchema);

module.exports.isOwner = function (user, id) {
  return user.playlists.some(function(playlist) {
    return playlist.equals(id);
  });
};
