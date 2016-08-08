var Schema = require('mongoose').Schema;
var User = require('./user');
var File = require('./file');
var Location = require('./location');

module.exports = new Schema({
  login: String,
  role: String,
  delegate: User,
  groups: [String],
  membershipdate: Date,
  legalname: String,
  legaladdress: Location,

  eugrants: [String],
  foundationyear: String,
  officialregistrationnumber: String,
  phone: String,
  pic: String,
  is_publicemail: String,
  recuperatevat: Boolean,
  stamp: String,
  type: String,
  url: String,
  vatnumber: String,

  legalrepresentative: User,
  legalrepresentativetitle: String,
  legalrepresentativerole: String,

  officeaddress: Location, // FIXME TO BE DELETED inherit from crew
  contacts: [User],
  /*
   legalrepresentativeemail: String, // FIXME TO BE DELETED inherit from user
   legalrepresentativefacebook: String, // FIXME TO BE DELETED inherit from user
   legalrepresentativemobilephone: String, // FIXME TO BE DELETED inherit from user
   legalrepresentativename: String, // FIXME TO BE DELETED inherit from user
   legalrepresentativeskype: String, // FIXME TO BE DELETED inherit from user
   legalrepresentativesurname: String, // FIXME TO BE DELETED inherit from user

   contactemail: String,
   contactfacebook: String,
   contactlanguage: String,
   contactmobilephone: String,
   contactname: String,
   contactskype: String,
   contactsurname: String,
   */

  logo: File,
  vectorlogo: File,
  cv: File,
  statute: File,
  memberscv: [File]
});