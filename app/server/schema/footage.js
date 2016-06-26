var Schema = require('mongoose').Schema;
var File = require('./file');
var User = require('./user');
var Playlist = require('./playlist');

module.exports = new Schema({
	tag: [String],
	public: Boolean,
	permalink: String,
	old_id: String,
	preview_file: String,
	playlists: [Playlist],
	files: [File],
	users: [User],
	stats: {
		visits: Number,
		downloads: Number,
		rates: {
			stars: String,
			tot_rate: String,
			sum_rate: String
		}
	},
	title: String,
	text: String,
	creation_date: Date
}, {collection: 'footage'});
