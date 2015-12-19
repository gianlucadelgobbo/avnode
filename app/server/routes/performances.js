var config = require('getconfig');
var Performance = require('../models/performance');
var _ = require('lodash');

exports.get = function get(req, res) {
	var params = _.filter(req.params, function(v, k) {
		return (k === 'filter' || k === 'page' || k === 'sorting');
	});
	var section = 'performances';
	var page = req.params.page || 1;
	var skip = (page - 1) * config.sections[section].limit;
	var filter = req.params.filter || config.sections[section].categories[0];
	var query = config.sections[section].searchQ[filter];
	var sorting = req.params.sorting || config.sections[section].orders[0];

  var path = '/' + section + '/' + _.map(req.params, function(p) { return p; }).join('/') + '/';
	path = path.replace('//', '/');

	Performance.count(query, function(error, total) {
		Performance.find(query)
		.limit(config.sections[section].limit)
		.skip(skip)
		.sort(config.sections[section].sortQ[sorting])
		.exec(function(error, performer) {
			res.render('list', {
				title: config.sections[section].title,
				sez: section,
				tot: total,
				path: path,
				sort: sorting,
				filter: filter,
				skip: skip,
				result: performer,
				user: req.user
			});
		});
	});
};
