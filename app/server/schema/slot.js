var Schema = require('mongoose').Schema;
var Performancesummary = require('./performancesummary');
var Schedule = require('./schedule');




module.exports = new Schema({
  performance: Performancesummary,
  schedule: Schedule,
  topics:[{
    title: String,
    description: String
  }]
});
