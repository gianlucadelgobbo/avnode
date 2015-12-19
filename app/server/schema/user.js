var Schema = require('mongoose').Schema;
var File = require('./file');

module.exports = new Schema({
	old_id: Number,
	permalink: String,
	display_name: String,
	files: [File],
	stats: {
		// FIXME
	}
});