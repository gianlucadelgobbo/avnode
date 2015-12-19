var Schema = require('mongoose').Schema;
var Footage = require('./footage');
var File = require('./file');
var User = require('./user');
var config = require('getconfig');

module.exports = new Schema({
	creation_date: Date,
	title: String,
	files: [File],
	footage: [Footage],
	old_id: Number,
	permalink: String,
	public: Boolean,
	stats: {
		visits: Number,
		downloads: Number,
		rates: {
			stars: String,
			tot_rate: String,
			sum_rate: String
		}
	},
	users: [User]
});
