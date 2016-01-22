var Schema = require('mongoose').Schema;
var Category = require('./category');
var Location = require('./location');
var File = require('./file');
var User = require('./user');
var config = require('getconfig');

// Derived from the entry:
// "permalink" : "3x3-smil-stereoscopy-mapping-in-live1re-ditionoctober-11-12-13-paris-2013",
module.exports = new Schema({
	websites: [String],
	permalink: String,
	performances: [], //FIXME
	gallery: [], //FIXME
  partners: [], //FIXME
	old_id: String,
	title: String,
	subtitle: {},
	text: {},
	files: [File],
	users: [User], //{ type: Schema.Types.ObjectId, ref: 'User' }],
	date_time_venue: [], //FIXME
	settings: {
		is_public: Boolean,
		gallery_is_public: Boolean,
		call: {
			is_active: Boolean,
			program_builder: Boolean,
			advanced_proposals_manager: Boolean,
      next_edition: String,
      header_image: String,
      background_image: String,
      background_color: String,
      calls: [{
        title: String
      }]
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
