var Schema = require('mongoose').Schema;
var File = require('./file');
var User = require('./user');
var Playlist = require('./playlist');



module.exports = new Schema({
	old_id: String,
	creation_date: Date,
	title: String,
	permalink: String,
	users: [User],
	files: [File],
	playlists: [Playlist],
	stats: {
		visits: Number,
		downloads: Number,
		rates: {
			stars: String,
			tot_rate: String,
			sum_rate: String
		}
	},
	preview_file: String,
	tag: [String],
	public: Boolean,
	text: String
}, {collection: 'footage'});
