var User = require('../../models/user');
var Event = require('../../models/event');

exports.getAll = function get(req, res) {
  User.findById({_id: '5170871ad931639094001b1d'}, function(err, user) {
    req.user = user;
    res.render('controlpanel/events/list', {
      result: req.user
    });
  });
};

exports.editEvent = function get(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(error, event) {
    switch (req.params.section) {
      case 'public':
        res.render('controlpanel/events/public', {
          countries: require('country-list')().getData(),
          result: event
        });
      break;
      case 'image':
        res.render('controlpanel/events/image', {
          image: null,
          result: event
        });
      break;
      case 'settings':
        res.render('controlpanel/events/settings', {
          result: event
        });
      break;
    }
  });
};

exports.post = function post(req, res) {
};
