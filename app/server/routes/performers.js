var config = require('getconfig');
var Performer = require('../models/user');
var _ = require('lodash');

exports.get = function get(req, res) {
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

	var path = '/' + section + '/' + _.map(req.params, function(p) { return p; }).join('/') + '/';
	path = path.replace('//', '/');

	// TODO: Validate that the params above are configured in `config`, if not
	// => 404 or 500

	Performer.count(query, function(error, total) {
		Performer.find(query)
		.limit(config.sections[section].limit)
		.skip(skip)
		.sort(config.sections[section].sortQ[sorting])
		.exec(function(error, events) {
			res.render('list', {
				title: config.sections[section].title,
				sez: section,
				tot: total,
				path: path,
				sort: sorting,
				filter: filter,
				skip: skip,
				result: events,
				user: req.user
			});
		});
	});
};
