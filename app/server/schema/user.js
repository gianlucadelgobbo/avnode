var Schema = require('mongoose').Schema;
var File = require('./file');

module.exports = new Schema({
	old_id: Number,
	permalink: String,
	display_name: String,
  locations: Array,
  performances: Array,
  events: Array,
  crews: Array,
  footage: Array,
  playlists: Array,
  // FIXME convention mixture of singular/plural
  tvshow: Array,
  // FIXME convention mixture of singular/plural
  gallery: Array,
	files: [File],
  text: Object,
	stats: {
		// FIXME
	}
});
