var Schema = require('mongoose').Schema;
var Usersummary = require('./usersummary');
var Category = require('./category');




module.exports = new Schema({
  user: Usersummary,
  categories: [Category]
});
