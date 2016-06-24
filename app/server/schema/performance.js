var Schema = require('mongoose').Schema;
var Gallery = require('./gallery');
var File = require('./file');
var User = require('./user');
var Events = require('./event');
var Category = require('./category');
var config = require('getconfig');

// Reuse the configured locales…
var text = {};
var tech_req = {};
config.locales.forEach(function(locale) {
	text[locale] = String;
	tech_req[locale] = String;
});

module.exports = new Schema({
	duration: Number,
	public: Boolean,
	permalink: String,
	tech_req: tech_req,
	gallery: Gallery,
	old_id: String,
	title: String,
	text: text,
	files: [File],
	users: [User],
	events: [Events],
	categories: [Category],
	stats: {
		visits: Number,
		rates: {
			stars: String,
			tot_rate: String,
			sum_rate: String
		}
	},
	creation_date: Date,
});
