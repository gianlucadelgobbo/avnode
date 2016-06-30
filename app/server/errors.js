var util = require('util');

module.exports = {
  NotFound: function NotFound(message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NotFoundError';
    this.statusCode = 404;
    this.message = message || 'not found';
  },
  Internal: function Internal(message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'InternalError';
    this.statusCode = 500;
    this.message = message || 'internal error';
  }
}
util.inherits(module.exports.NotFound, Error);
util.inherits(module.exports.Internal, Error);
