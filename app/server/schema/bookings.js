var Schema = require('mongoose').Schema;
var Eventsummary = require('./eventsummary');
var Schedule = require('./schedule');




module.exports = new Schema({
  event: Eventsummary,
  schedule: Schedule
});
