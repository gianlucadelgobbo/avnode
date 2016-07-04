var Schema = require('mongoose').Schema;
var Performance = require('./performance');
var Schedule = require('./schedule');




module.exports = new Schema({
  performance: Performance,
  schedule: Schedule
});
