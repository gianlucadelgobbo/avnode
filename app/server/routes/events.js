var config = require('getconfig');
var Event = require('../models/event');
var Category = require('../models/category');
var _ = require('lodash');

var _h = require('../helper/index');

exports.get = function get(req, res) {
  var redirect = false;
  if (req.params.filter === undefined
    || req.params.sorting === undefined
      || req.params.page === undefined) {
    redirect = true;
  }
  var section = 'events';
  var page = req.params.page || 1;
  var skip = (page - 1) * config.sections[section].limit;
  var filter = req.params.filter || config.sections[section].categories[0];
  var query = config.sections[section].searchQ[filter];
  var sorting = req.params.sorting || config.sections[section].orders[0];

  if (redirect) {
    res.redirect('/events/' + filter + '/' + sorting + '/' + page);
    return;
  }

  // FIXME:
  var path = '/' + section + '/' + _.map(req.params, function(p) { return p; }).join('/') + '/';
  path = path.replace('//', '/');
  // TODO: Validate that the params above are configured in `config`, if not
  // => 404 or 500…
  //
  var populateQuery = [{path:'categories', select:'permalink'}, {path:'users'}];
  if (filter === 'all') {
    Event.find(query).count(function(err, total) {
      Event
        .find(query)
        .populate(populateQuery)
        .limit(config.sections[section].limit)
        .skip(skip)
        .sort(config.sections[section].sortQ[sorting])
        .exec(function(error, events) {
          var title = config.sections[section].title;
          var info = ' From ' + skip + ' to ' + (skip + config.sections[section].limit) + ' on ' + total + ' ' + title;
          var link = '/events/' + filter + '/' + sorting + '/';
          var pages = _h.pagination(link, skip, config.sections[section].limit, total);
          res.render('events/list', {
            config: config,
            title: title,
            section: section,
            total: total,
            path: path,
            sort: sorting,
            filter: filter,
            skip: skip,
            page: page,
            pages: pages,
            info: info,
            result: events,
            user: req.user,
            categories: config.sections[section].categories,
            orderings: config.sections[section].orders,
            _h: _h
          });
        });
    });
  } else {
    Category.findOne({'permalink': filter}, function(err, category) {
      Event
        .find({categories: { $in: [category._id]}})
        .count()
        .exec(function(err, total) {
          Event
            .find({categories: { $in: [category._id]}})
            .populate(populateQuery)
            .limit(config.sections[section].limit)
            .skip(skip)
            .sort(config.sections[section].sortQ[sorting])
            .exec(function(error, events) {
              var title = config.sections[section].title;
              var info = ' From ' + skip + ' to ' + (skip + config.sections[section].limit) + ' on ' + total + ' ' + title;
              var link = '/events/' + filter + '/' + sorting + '/';
              var pages = _h.pagination(link, skip, config.sections[section].limit, total);
              res.render('events/list', {
                config: config,
                title: title,
                section: section,
                total: total,
                path: path,
                sort: sorting,
                filter: filter,
                skip: skip,
                page: page,
                pages: pages,
                info: info,
                result: events,
                user: req.user,
                categories: config.sections[section].categories,
                orderings: config.sections[section].orders,
                _h: _h
              });
            });
        });
    });
  }
};
