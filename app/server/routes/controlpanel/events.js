var User = require('../../models/user');
var Event = require('../../models/event');
var _ = require('lodash');
var config = require('getconfig');
var flatten = require('flat');

exports.getAll = function get(req, res) {
  res.render('controlpanel/events/list', {
    activeChapter: 'events',
    activeSection: req.params.section,
    config: config,
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

exports.editEvent = function (req, res) {
  var render = function(template, data) {
    data.activeChapter = 'events';
    data.activeSection = req.params.section;
    data.config = config;
    res.render(template, data);
  }
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(error, event) {
    switch (req.params.section) {
      case 'public':
        render('controlpanel/events/public', {
          countries: require('country-list')().getData(),
          result: event
        });
      break;
      case 'image':
        render('controlpanel/events/image', {
          image: null,
          result: event
        });
      break;
      case 'visibility':
        render('controlpanel/events/visibility', {
          result: event
        });
      break;
      case 'permissions':
        render('controlpanel/events/permissions', {
          result: event
        });
      break;
      case 'calls':
        if (!_.isEmpty(req.body)) {
          var data = req.body;
          _.defaultsDeep(data, {
            settings: {
              call: {
                is_active: false,
                program_builder: false,
                advanced_proposals_manager: false
              }
            }
          });
          Event.findByIdAndUpdate(event._id, {$set: flatten(data)}, {new: true}, function (err, event) {
            if (err) {}
            render('controlpanel/events/calls', {result: event});
          });
        } else {
          render('controlpanel/events/calls', {result: event});
        }
      break;
    }
  });
};

exports.newEventCall = function (req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(error, event) {
    if (event.settings.call.calls === undefined) {
      event.settings.call.calls = [];
    }
    event.settings.call.calls.push({title: ''});
    var call = _.last(event.settings.call.calls);
    event.save(function (err, event) {
      res.redirect(call._id);
    });
  });
};

exports.deleteEventCall = function (req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(error, event) {
    var call = event.settings.call.calls.id(req.params.call);
    call.remove();
    event.save(function (err, event) {
      res.redirect('../../calls');
    });
  });
}

exports.editEventCall = function (req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(error, event) {
    var data = _.defaults(req.body, {
      packages: [],
      topics: [],
      admitted: []
    });
    data.packages.map(function(pkg) {
      _.defaults(pkg, {
        personal: false,
        requested: false,
        allow_multiple: false,
        allow_options: false
      });
    });
    var call = event.settings.call.calls.id(req.params.call);
    call = _.assign(call, data);
    call.markModified('packages');
    call.markModified('topics');
    call.markModified('admitted');
    event.save(function(err) {
      res.render('controlpanel/events/call/edit', {
        call: call,
        activeChapter: 'events',
        activeSection: req.params.section,
        config: config,
        result: event
      });
    });
  });
};

exports.post = function post(req, res) {
};
