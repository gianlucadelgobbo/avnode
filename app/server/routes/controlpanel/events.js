var User = require('../../models/user');
var Event = require('../../models/event');
var _ = require('lodash');
var config = require('getconfig');
var Joi = require('joi');
var flatten = require('flat');

exports.listGet = function get(req, res) {
  res.render('controlpanel/events/list', {
    config: config,
    result: req.user
  });
};

exports.publicSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.publicGet = function(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(err, event) {
    res.render('controlpanel/events/public', {
      config: config,
      result: event,
      user: req.user
    });
  });
}
exports.publicSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required(),
  title: Joi.string().required(),
  permalink: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
  subtitle: Joi.object().allow(config.locales),
  text: Joi.object().allow(config.locales),
  websites: Joi.array().items(
    Joi.string().uri()
  ),
  venues: Joi.array().items(
    Joi.object().keys({
      venue: Joi.string().alphanum().required(),
      date: Joi.date().format('YYYY-MM-DD'),
      start_time: Joi.date().format('H:i'),
      end_time: Joi.date().format('H:i'),
      street: Joi.string().allow(''),
      streetnumber: Joi.string().allow(''),
      zip: Joi.string().allow(''),
      city: Joi.string().allow(''),
      country: Joi.string().allow('')
    })
  )
};
exports.publicPost = function(req, res) {
  var data = _.defaults(req.body, {
    websites: [],
    venues: []
  });
  Event.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, event) {
    res.render('controlpanel/events/public', {
      config: config,
      result: event
    });
  });
}

exports.imageSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.imageGet = function(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
      .exec(function(err, event) {
        res.render('controlpanel/events/image', {
          config: config,
          result: event
        });
      });
}
exports.imageSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required()
};
exports.imagePost = function(req, res) {
  var data = _.defaults(req.body, { });
  User.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, event) {
    res.render('controlpanel/events/image', {
      config: config,
      result: event
    });
  });
}

exports.performancesSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.performancesGet = function(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
      .exec(function(err, event) {
        res.render('controlpanel/events/performances', {
          config: config,
          result: event
        });
      });
}
exports.performancesSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required()
};
exports.performancesPost = function(req, res) {
  /*var data = _.defaults(req.body, { });
  User.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, event) {
    res.render('controlpanel/events/performances', {
      config: config,
      result: event
    });
  });*/
}

exports.partnersSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.partnersGet = function(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
      .exec(function(err, event) {
        res.render('controlpanel/events/partners', {
          config: config,
          result: event
        });
      });
}
exports.partnersSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required()
};
exports.partnersPost = function(req, res) {
  /*var data = _.defaults(req.body, { });
   User.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, event) {
   res.render('controlpanel/events/partners', {
   config: config,
   result: event
   });
   });*/
}

exports.galleriesSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.galleriesGet = function(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
      .exec(function(err, event) {
        res.render('controlpanel/events/galleries', {
          config: config,
          result: event
        });
      });
}
exports.galleriesSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required()
};
exports.galleriesPost = function(req, res) {
  /*var data = _.defaults(req.body, { });
   User.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, event) {
   res.render('controlpanel/events/galleries', {
   config: config,
   result: event
   });
   });*/
}

exports.visibilitySchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.visibilityGet = function(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(err, event) {
    res.render('controlpanel/events/visibility', {
      config: config,
      result: event
    });
  });
}
exports.visibilitySchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required(),
  settings: Joi.object().keys({
    is_public: Joi.boolean(),
    gallery_is_public: Joi.boolean()
  })
};
exports.visibilityPost = function(req, res) {
  var data = _.defaultsDeep(req.body, {
    settings: {
      is_public: false,
      gallery_is_public: false
    }
  });
  Event.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, event) {
    res.render('controlpanel/events/visibility', {
      config: config,
      result: event
    });
  });
}

exports.permissionsSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.permissionsGet = function(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(err, event) {
    res.render('controlpanel/events/permissions', {
      config: config,
      result: event
    });
  });
}
exports.permissionsSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required()
};
exports.permissionsPost = function(req, res) {
  var data = _.defaultsDeep(req.body, { });
  Event.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, event) {
    res.render('controlpanel/events/permissions', {
      config: config,
      result: event
    });
  });
}

exports.callsSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
}
exports.callsGet = function(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(err, event) {
    res.render('controlpanel/events/calls', {
      config: config,
      result: event
    });
  });
}
exports.callsSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required(),
  settings: Joi.object().keys({
    call: Joi.object().keys({
      is_active: Joi.boolean(),
      program_builder: Joi.boolean(),
      advanced_proposals_manager: Joi.boolean(),
      next_edition: Joi.string().alphanum().allow(''),
      header_image: Joi.string().alphanum().allow(''),
      background_image: Joi.string().alphanum().allow(''),
      background_color: Joi.string().alphanum().allow('')
    })
  })
};
exports.callsPost = function(req, res) {
  var data = _.defaultsDeep(req.body, {
    settings: {
      is_active: false,
      program_builder: false,
      advanced_proposals_manager: false
    }
  });
  Event.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, event) {
    res.render('controlpanel/events/calls', {
      config: config,
      result: event
    });
  });
}

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

exports.newCallSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required()
}
exports.newCallGet = function (req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(error, event) {
    _.defaultsDeep(event, {
      settings: {
        call: {
          calls: []
        }
      }
    });
    event.settings.call.calls.push({title: __('New call')});
    var call = _.last(event.settings.call.calls);
    event.save(function (err, event) {
      res.redirect(call._id);
    });
  });
};

exports.deleteCallSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
  call: Joi.string().alphanum().min(24).max(24).required()
}
exports.deleteCallGet = function (req, res) {
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

exports.editCallSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
  call: Joi.string().alphanum().min(24).max(24).required()
}
exports.editCallGet = function (req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(error, event) {
    var call = event.settings.call.calls.id(req.params.call);
    res.render('controlpanel/events/call/edit', {
      config: config,
      call: call,
      result: event
    });
  });
};
exports.editCallSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required(),
  call_id: Joi.string().alphanum().min(24).max(24).required(),
  title: Joi.string().required(),
  email: Joi.string().email().allow(''),
  permalink: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
  start_date: Joi.date().allow('').format('YYYY-MM-DD'),
  end_date: Joi.date().allow('').format('YYYY-MM-DD'),
  admitted: Joi.array().items(
    Joi.string().allow(config.sections.performances.categories)
  ),
  excerpt: Joi.string().allow(''),
  terms: Joi.string().allow(''),
  topics: Joi.array().items(
    Joi.object().keys({
      _id: Joi.string().alphanum().min(24).max(24),
      title: Joi.string().allow(''),
      description: Joi.string().allow('')
    })
  ),
  packages: Joi.array().items(
    Joi.object().keys({
      _id: Joi.string().alphanum().min(24).max(24),
      title: Joi.string().allow(''),
      price: Joi.number().allow(''),
      description: Joi.string().allow(''),
      personal: Joi.boolean(),
      requested: Joi.boolean(),
      allow_multiple: Joi.boolean(),
      allow_options: Joi.boolean(),
      daily: Joi.object().keys({
        start_date: Joi.date().allow('').format('YYYY-MM-DD'),
        end_date: Joi.date().allow('').format('YYYY-MM-DD')
      })
    })
  ),
}
exports.editCallPost = function (req, res) {
  Event.findById(req.body._id, function(error, event) {
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
    var call = event.settings.call.calls.id(req.body.call_id);
    call = _.assign(call, data);
    call.markModified('packages');
    call.markModified('topics');
    call.markModified('admitted');
    event.save(function(err) {
      res.render('controlpanel/events/call/edit', {
        config: config,
        call: call,
        result: event
      });
    });
  });
};
