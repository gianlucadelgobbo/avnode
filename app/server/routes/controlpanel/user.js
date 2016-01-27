var User = require('../../models/user');
var _ = require('lodash');
var config = require('getconfig');
var _h = require('../../helper/index');

exports.editUser = function (req, res) {
  var render = function(template, data) {
    data.activeChapter = 'user';
    data.activeSection = req.params.section;
    data.config = config;
    res.render(template, data);
  }
  switch (req.params.section) {
    case 'public':
      var template = 'controlpanel/user/public';
      if (!_.isEmpty(req.body)) {
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
          render(template, {
            result: user,
            errors: errors
          });
        });
      } else {
        render(template, {
          result: req.user
        });
      }
    break;
    case 'image':
      var template = 'controlpanel/user/image';
      if (!_.isEmpty(req.body)) {
        var errors = false;
        var data = {
          'files.0.file': req.body.image
        }
        User.findByIdAndUpdate(req.user._id, { $set: data }, function (err, user) {
          if (err) res.json({success: false});
          res.json({success: true});
        });
      } else {
        render(template, {
          image: req.user.files[0]
        });
      }
    break;
    case 'password':
      var template = 'controlpanel/user/password';
      if (!_.isEmpty(req.body)) {
        req.checkBody({
          'new_password': {
            isLength: {
              options: [8, 255],
              errorMessage: __('Your password is too short')
            },
            isIdentical: {
              options: [req.body.new_password_confirm],
              errorMessage: __('Password confirm needs to be identical')
            }
          }
        });
        var errors = req.validationErrors();
        if (_.isEmpty(errors)) {
          req.user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch) {
              User.findById(req.user._id, function(err, user) {
                user.password = req.body.new_password;
                user.save(function(err) {
                  render(template, { result: user });
                });
              });
            }
          });
        } else {
          render(template, { result: req.user, errors: errors });
        }
      } else {
        render(template, { result: req.user});
      }
    break;
    case 'private':
      if (!_.isEmpty(req.body)) {
        var data = req.body;
        User.findByIdAndUpdate(req.user._id, { $set: data }, { new: true }, function (err, user) {
          render('controlpanel/user/private', {
            result: user,
            countries: require('country-list')().getData(),
            errors: errors
          });
        });
      } else {
        render('controlpanel/user/private', {
          result: req.user,
          countries: require('country-list')().getData()
        });
      }
    break;
    //- FIXME
    case 'emails':
      if (!_.isEmpty(req.body)) {
        var mail = req.body.emails[0].email;
        _h.mail.sendVerificationMail(mail);
      }
      render('controlpanel/user/emails', {
        result: req.user
      });
    break;
    //- FIXME
    case 'connections':
      render('controlpanel/user/connections', {
        result: req.user
      });
    break;
  }
};
