var mongoose = require('mongoose');
var userSchema = require('../schema/user');

module.exports = mongoose.model('User', userSchema);
