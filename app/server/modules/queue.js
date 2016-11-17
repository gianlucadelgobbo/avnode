var config = require('getconfig'),
  mongodb = require('mongodb'),
  mongoDbQueue = require('mongodb-queue');

var queue = null;
var con = config.mongo;

module.exports.connect = function (done) {
  mongodb.MongoClient.connect(con, function(err, db) {
    queue = mongoDbQueue(db, 'queue');
    done(err);
  });
};

module.exports.get = function(handler) {
  queue.get(handler);
};

module.exports.ping = function(ack, done) {
  queue.ping(ack, done);
};

module.exports.remove = function(ack, done) {
  queue.ack(ack, done);
};

module.exports.add = function(job) {
  if (queue) {
    queue.add(job, function(err) {
      if (err) throw err;
      console.log('job added', job);
    });
  }
};

