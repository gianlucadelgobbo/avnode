var config = require('getconfig');
var Footage = require('../models/footage');
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
		return (k === 'filter' || k === 'page' || k === 'sorting');
	});
	var section = 'footage';
	var page = req.params.page || 1;
	var skip = (page - 1) * config.sections[section].limit;
	var filter = req.params.filter || config.sections[section].categories[0];
	var query = config.sections[section].searchQ[filter];
	var sorting = req.params.sorting || config.sections[section].orders[0];

  if (redirect) {
    res.redirect('/' + section + '/' + filter + '/' + sorting + '/' + page);
  }

  var path = '/' + section + '/' + _.map(req.params, function(p) { return p; }).join('/') + '/';
	path = path.replace('//', '/');

	Footage.count(query, function(error, total) {
		Footage.find(query)
		.limit(config.sections[section].limit)
		.skip(skip)
		.sort(config.sections[section].sortQ[sorting])
		.exec(function(error, footage) {
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
				result: footage,
        categories: config.sections[section].categories,
        orderings: config.sections[section].orders,
				user: req.user
			});
		});
	});
};
