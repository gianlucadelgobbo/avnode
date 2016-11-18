var expect = require('expect');
var isOwner = require('../../../app/server/models/footage').isOwner;
var mongoose = require('mongoose');

describe('Footage Model', function() {
  var user = null;
  beforeEach(function() {
    user = {
      _id: '0987654',
      footages: [
        mongoose.Types.ObjectId('57c411b83e060ffc3634dcf4'),
        mongoose.Types.ObjectId('57c411ca3bbefc0e37b877e9'),
        mongoose.Types.ObjectId('57c411cf2819c01d377b54e8')
      ]
    };
  });
  it('isOwner should return false if footage id is not present', function() {
    expect(isOwner(user, '1111')).toBe(false);
  });
  it('isOwner should return true if user has footage id', function() {
    expect(isOwner(user, '57c411ca3bbefc0e37b877e9')).toBe(true);
  });
  it('isOwner should return true if valid id is of type string', function() {
    expect(isOwner(user, '57c411ca3bbefc0e37b877e9')).toBe(true);
  });
  it('isOwner should return true if valid id is an ObjectId', function() {
    var id = mongoose.Types.ObjectId('57c411cf2819c01d377b54e8');
    expect(isOwner(user, id)).toBe(true);
  });
});
