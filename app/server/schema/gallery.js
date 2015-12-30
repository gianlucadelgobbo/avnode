var Schema = require('mongoose').Schema;
var File = require('./file');
var User = require('./user');
var Event = require('./event');
var Footage = require('./footage');
var Performance = require('./performance');

module.exports = new Schema({
	permalink: String,
	stats: {
		img: Number,
		visits: Number
	},
	performances: [Performance], //FIXME
	old_id: String,
	title: String,
	files: [File],
	users: [User],
	events: [Event],
	creation_date: Date,
	footage: [Footage]
  }, {
    // FIXME maybe would be better to rename the collection
    collection: 'gallery'
  }
);
