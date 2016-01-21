var User = require('../../models/user');
var Event = require('../../models/event');

exports.getAll = function get(req, res) {
  res.render('controlpanel/events/list', {
    result: req.user
  });
};

// FIXME
exports.newEvent = function put(req, res) {
  var permalink = req.params.permalink
  permalink = permalink.toLowerCase();
  permalink = permalink.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  var query = { 'permalink': permalink };
  Event.findOne(query, function(err, event) {
    var response = '';
    if (err) {}
    if (event === null) {
      Event.create({ permalink: permalink }, function (err, event) {
        if (!err) {
          response = '/controlpanel/events/' + permalink + '/public';
        }
        res.json(response);
      });
    } else {
      res.json(response);
    }
  });
}

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
