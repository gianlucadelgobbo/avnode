var Schema = require('mongoose').Schema;
var Category = require('./category');
var Location = require('./location');
var File = require('./file');
var User = require('./user');
var config = require('getconfig');

// Reuse the configured locales…
var subtitle = {};
var text = {};
config.locales.forEach(function(locale) {
	subtitle[locale] = String;
	text[locale] = String;
});

// Derived from the entry: 
// "permalink" : "3x3-smil-stereoscopy-mapping-in-live1re-ditionoctober-11-12-13-paris-2013",
module.exports = new Schema({
	websites: [String],
	permalink: String,
	performances: [], //FIXME
	gallery: [], //FIXME
	old_id: String,
	title: String,
	subtitle: subtitle,
	text: text,
	files: [File],
	users: [User],
	date_time_venue: [], //FIXME
	settings: {
		is_public: Boolean,
		gallery_is_public: Boolean,
		call: {
			is_active: Boolean,
			program_builder: Boolean,
			advanced_proposals_manager: Boolean
		},
		permissions: {
			administrator: [User], // FIXME
		}
	},
	categories: [Category],
	stats: {
		visits: Number,
		rates: {
			stars: String,
			tot_rate: String,
			sum_rate: String
		}
	},
	creation_date: Date
});

// Other stuff found:
//
	/*
	activity: Number,
	categories: [Category],
	creation_date: Date,
	display_name: String,
	files: [File],
	is_crew: Number,
	locations: [Location],
	members: [], // FIXME
	old_id: Number,
	permalink: String,
	public: Number,
	stats: {
		members: Number
	},
	title: String,
	user_type: Number,
	websites: [String], // FIXME
	partnerships: [], // FIXME
	*/
