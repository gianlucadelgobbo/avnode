var config = require('getconfig');
var Performer = require('../models/user');
var _ = require('lodash');

var _h = require('../helper/index');

exports.get = function get(req, res) {
  redirect = false
  if (req.params.filter === undefined
    || req.params.sorting === undefined
    || req.params.page === undefined) {
    redirect = true
  }
  var params = _.filter(req.params, function(v, k) {
    if (k === 'filter' || k === 'page' || k === 'sorting') {
      return true;
    } else {
      return false;
    }
  });
  var section = 'performers';
  var page = req.params.page || 1;
  var skip = (page - 1) * config.sections[section].limit;
  var filter = req.params.filter || config.sections[section].categories[0];
  var query = config.sections[section].searchQ[filter];
  var sorting = req.params.sorting || config.sections[section].orders[0];

  if (redirect) {
    res.redirect('/' + section + '/' + filter + '/' + sorting + '/' + page);
    return
  }

  var path = '/' + section + '/' + _.map(req.params, function(p) { return p; }).join('/') + '/';
  path = path.replace('//', '/');

  // TODO: Validate that the params above are configured in `config`, if not
  // => 404 or 500
  console.log(config.sections[section].sortQ[sorting]);
  Performer.count(query, function(error, total) {
    Performer.find(query)
    .limit(config.sections[section].limit)
    .skip(skip)
    .sort(config.sections[section].sortQ[sorting])
    .exec(function(error, events) {
      var title = config.sections[section].title;
      var info = " From " + skip + " to " + (skip + config.sections[section].limit) + " on " + total + " " + title;
      var link = '/' + section + '/' + filter + "/" + sorting + "/";
      var pages = _h.pagination(link, skip, config.sections[section].limit, total);
      res.render(section + '/list', {
        title: title,
        info: info,
        section: section,
        total: total,
        path: path,
        sort: sorting,
        filter: filter,
        skip: skip,
        page: page,
        pages: pages,
        result: events,
        categories: config.sections[section].categories,
        orderings: config.sections[section].orders,
        user: req.user,
        _h: _h
      });
    });
  });
};
