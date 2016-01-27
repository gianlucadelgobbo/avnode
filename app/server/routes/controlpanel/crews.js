var User = require('../../models/user');
var Crew = require('../../models/user');
var config = require('getconfig');

exports.getAll = function get(req, res) {
  res.render('controlpanel/crews/list', {
    activeChapter: 'crews',
    activeSection: req.params.section,
    config: config,
    result: req.user
  });
};

exports.editCrew = function get(req, res) {
  var render = function(template, data) {
    data.activeChapter = 'crews';
    data.activeSection = req.params.section;
    data.config = config;
    res.render(template, data);
  }

  var query = { 'permalink': req.params.crew };
  Crew.findOne(query)
  .exec(function(error, crew) {
    switch (req.params.section) {
      case 'public':
        render('controlpanel/crews/public', {
          result: crew
        });
      break;
      case 'image':
        render('controlpanel/crews/image', {
          image: null,
          result: crew
        });
      break;
      case 'members':
        render('controlpanel/crews/members', {
          result: crew
        });
      break;
    }
  });
};

exports.post = function post(req, res) {
};
