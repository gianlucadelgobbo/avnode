var Schema = require('mongoose').Schema;

module.exports = new Schema({
	file: String,
	preview: String,
	filesize: String,
	duration: Number
});
