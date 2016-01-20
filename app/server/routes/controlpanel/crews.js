var User = require('../../models/user');
var Crew = require('../../models/user');

exports.getAll = function get(req, res) {
  User.findById({_id: '5170871ad931639094001b1d'}, function(err, user) {
    req.user = user;
    res.render('controlpanel/crews/list', {
      result: req.user
    });
  });
};

exports.editCrew = function get(req, res) {
  var query = { 'permalink': req.params.crew };
  Crew.findOne(query)
  .exec(function(error, crew) {
    switch (req.params.section) {
      case 'public':
        res.render('controlpanel/crews/public', {
          result: crew
        });
      break;
      case 'image':
        res.render('controlpanel/crews/image', {
          image: null,
          result: crew
        });
      break;
      case 'members':
        res.render('controlpanel/crews/members', {
          result: crew
        });
      break;
    }
  });
};

exports.post = function post(req, res) {
};
