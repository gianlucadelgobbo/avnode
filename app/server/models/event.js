var mongoose = require('mongoose');
var eventSchema = require('../schema/event');

module.exports = mongoose.model('Event', eventSchema);
