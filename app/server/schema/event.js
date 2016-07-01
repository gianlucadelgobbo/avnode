var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');
var Category = require('./category');
var DateTimeVenue = require('./locationvenuedatetime');
var Gallery = require('./gallery');
var Performances = require('./performance');
var config = require('getconfig');

// Reuse the configured locales…
var text = {};
var subtitle = {};
config.locales.forEach(function(locale) {
  text[locale] = String;
  subtitle[locale] = String;
});

module.exports = new Schema({
  old_id: String,
  creation_date: Date,
  title: String,
  permalink: String,
  text: text,
  public: Boolean,
  users: [User],
  files: [File],
  stats: {
    visits: Number,
    rates: {
      stars: String,
      tot_rate: String,
      sum_rate: String
    }
  },
  categories: [Category],
  subtitle: subtitle,
  websites: [String],
  performances: [Performances],
  galleries: [Gallery],
  partners: [User],
  date_time_venue: [DateTimeVenue],
  settings: {
    is_public: Boolean,
    gallery_is_public: Boolean,
    program_builder: Boolean,
    advanced_proposals_manager: Boolean,
    call: {
      is_active: Boolean,
      program_builder: Boolean,
      advanced_proposals_manager: Boolean,
      next_edition: String,
      header_image: String,
      background_image: String,
      background_color: String,
      calls: [{
        title: String,
        email: String,
        permalink: String,
        start_date: Date,
        end_date: Date,
        admitted: [String],
        excerpt: String,
        terms: String,
        topics: [{
          title: String,
          description: String
        }],
        packages: [{
          title: String,
          price: Number,
          description: String,
          personal: Boolean,
          requested: Boolean,
          allow_multiple: Boolean,
          allow_options: Boolean,
          daily: {
            start_date: Date,
            end_date: Date
          }
        }]
      }]
    },
    permissions: {
      administrator: [User], // FIXME
    }
  }
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
