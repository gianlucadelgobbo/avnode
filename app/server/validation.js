var Joi = require('joi');

module.exports.validateParams = function(schema) {
  return function (req, res, next) {
    Joi.validate(req.params, schema, function (err, value) {
      if (err !== null) {
        var msgs = err.details.map(function(item) {
          return item.message;
        });
        res.status(400).send(msgs);
      } else {
        req.params = value;
        next();
      }
    });
  };
};

module.exports.validateBody = function(schema) {
  return function (req, res, next) {
    Joi.validate(req.body, schema, function (err, value) {
      if (err !== null) {
        var msgs = err.details.map(function(item) {
          return item.message;
        });
        res.status(400).send(msgs);
      } else {
        req.body = value;
        next();
      }
    });
  };
};
