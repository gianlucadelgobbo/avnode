var Schema = require('mongoose').Schema;
var Category = require('./category');

module.exports = new Schema({
  old_id: Number,
  ancestor_old_id: Number,
  name: String,
  rel: String,
  permalink: String,
  ancestors: [Category] // What's that? Maybe nested categories? 
}, {collection: 'categories'});
