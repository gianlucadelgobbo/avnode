var Schema = require('mongoose').Schema;

module.exports = new Schema({
	old_id: Number,
	ancestor_old_id: Number,
	name: String,
	rel: String,
	permalink: String
});
