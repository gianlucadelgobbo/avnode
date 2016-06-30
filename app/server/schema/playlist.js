var Schema = require('mongoose').Schema;
var Footage = require('./footage');
var File = require('./file');
var User = require('./user');
var Playlist = require('./playlist');
var config = require('getconfig');


module.exports = new Schema({
	old_id: Number,
	creation_date: Date,
	title: String,
	permalink: String,
	users: [User],
	files: [File],
	footage: [Footage],
	playlists: [Playlist],
	public: Boolean,
	stats: {
		visits: Number,
		downloads: Number,
		rates: {
			stars: String,
			tot_rate: String,
			sum_rate: String
		}
	}
});
