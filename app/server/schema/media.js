var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');




module.exports = new Schema({
  old_id: String,
  creation_date: Date,
  title: String,
  permalink: String,
  text: {},
  users: [User],
  files: [File],  //always one
  stats: { // Summary of data coming by gallery and
    visits: Number,
    rates: {
      stars: String,
      tot_rate: String,
      sum_rate: String
    }
  }
});
