var User = require('../../models/user');

exports.get = function get(req, res) {
  User.findById({_id: '5170871ad931639094001b1d'}, function(err, user) {
    req.user = user;
    switch (req.params.section) {
      case 'public':
        res.render('controlpanel/user/public', {
          result: req.user
        });
      break;
      case 'image':
        var image = null;
        if (req.user.files.length) {
          image = req.user.files[0].file;
        }
        res.render('controlpanel/user/image', {
          image: image,
          result: req.user
        });
      break;
      case 'password':
        res.render('controlpanel/user/password', {
          result: req.user
        });
      break;
      case 'emails':
        res.render('controlpanel/user/emails', {
          result: req.user
        });
      break;
      case 'private':
        res.render('controlpanel/user/private', {
          countries: require('country-list')().getData(),
          result: req.user
        });
      break;
      case 'connections':
        res.render('controlpanel/user/connections', {
          result: req.user
        });
      break;
    }
  });
};

exports.post = function post(req, res) {
  User.findById({_id: '5170871ad931639094001b1d'}, function(err, user) {
    req.user = user;
    switch (req.params.section) {
      case 'public':
        req.checkBody({
          'display_name': {
            isLength: {
              options: [2, 60],
              errorMessage: ''
            },
            errorMessage: ''
          }
        });
        var errors = req.validationErrors();
        var data = {};
        if (!errors) {
          data = req.body;
        }
        User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true }, function (err, user) {
          if (err) {
            res.redirect('public');
          }
          res.render('controlpanel/user/public', {
            result: user,
            errors: errors
          });
        });
      break;
      case 'image':
        // FIXME
        var errors = false;
        var image = null;
        if (req.user.files.length) {
          image = req.user.files[0].file;
        }
        res.render('controlpanel/user/image', {
          image: image,
          errors: errors,
          result: req.user
        });
      break;
      case 'password':
        res.render('controlpanel/user/password', {
          result: req.user
        });
      break;
      case 'emails':
        res.render('controlpanel/user/emails', {
          result: req.user
        });
      break;
      case 'private':
        req.checkBody({
          'name': {
            isLength: {
              options: [2, 120],
              errorMessage: ''
            },
            errorMessage: ''
          }
        });
        var errors = req.validationErrors();
        var data = {};
        if (!errors) {
          data = req.body;
        }
        User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true }, function (err, user) {
          if (err) {
            res.redirect('public');
          }
          res.render('controlpanel/user/private', {
            result: user,
            countries: require('country-list')().getData(),
            errors: errors
          });
        });
      break;
      case 'connections':
        res.render('controlpanel/user/connections', {
          result: req.user
        });
      break;
    }
  });
};
