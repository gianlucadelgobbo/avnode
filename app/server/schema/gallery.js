var Schema = require('mongoose').Schema;
var File = require('./file');
var User = require('./user');
var Event = require('./event');
var Footage = require('./footage');
var Performance = require('./performance');

module.exports = new Schema({
	old_id: String,
	creation_date: Date,
	title: String,
	permalink: String,
	users: [User],
	files: [File],  //FIXME
	performances: [Performance], //FIXME
	events: [Event],
	footage: [Footage], //FIXME
	stats: {
		img: Number,
		visits: Number
	}
  }, {
    // FIXME maybe would be better to rename the collection
    collection: 'gallery'
  }
);
