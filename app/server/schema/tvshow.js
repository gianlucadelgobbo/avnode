var Schema = require('mongoose').Schema;
var Category = require('./category');
var File = require('./file');
var User = require('./user');

// Reuse the configured locales…
var text = {};
config.locales.forEach(function(locale) {
	text[locale] = String;
});


module.exports = new Schema({
	categories: [Category],
	creation_date: Date,
	files: [File],
	old_id: Number,
	//palinsetodate: Array ?!
	permalink: String,
	public: Number, // Boolean?
	text: text,
	title: String,
	users: [User],
	stats: {
		visits: Number,
		rates: {
			stars: String,
			tot_rate: String,
			sum_rate: String
		}
	},
});
