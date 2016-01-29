var express = require('express');
var router = express.Router();

var passport = require('passport');

var login = require('./login');
var confirm = require('./confirm');
var logout = require('./logout');
var signup = require('./signup');
var user = require('./user');
var crews = require('./crews');
var events = require('./events');
var validate = require('../../validation.js');

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login'}),
  function(req, res) {
    console.log('redirect');
    res.redirect('/');// + req.user.permalink);
  }
);
router.get('/login', login.get);

router.get('/login/facebook',
    passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    })
);
router.get('/login/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login/'
    })
);

router.get('/login/twitter',
    passport.authenticate('twitter')
);
router.get('/login/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login/'
    })
);

router.get('/login/google',
    passport.authenticate('google', { scope: ['email','profile'] })
);
router.get('/login/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login/'
    })
);

router.get('/logout', logout.get);

router.get('/signup/', signup.get);
router.post('/signup/', signup.post);

router.get('/confirm', confirm.get);

// FIXME
router.use('/*', function(req, res, next) {
  var User = require('./../../models/user');
  User.findById({_id: '5170871ad931639094001b1d'}, function(err, user) {
    req.user = user;
    next();
  });
  //if (!req.user) {
  //  res.redirect('/login/?from='+req.url);
  //} else {
  //  next();
  //}
});

router.get('/user/public', user.editUserPublicGet);
router.post('/user/public', validate(user.editUserPublicSchema), user.editUserPublicPost);
router.get('/user', function(req, res) {
  res.redirect('/controlpanel/user/public');
});

router.get('/user/image', user.editUserImageGet);
router.post('/user/image', validate(user.editUserImageSchema), user.editUserImagePost);

router.get('/user/password', user.editUserPasswordGet);
router.post('/user/password', validate(user.editUserPasswordSchema), user.editUserPasswordPost);

router.get('/user/private', user.editUserPrivateGet);
router.post('/user/private', validate(user.editUserPrivateSchema), user.editUserPrivatePost);

router.get('/user/emails', user.editUserEmailsGet);
router.post('/user/emails', validate(user.editUserEmailsSchema), user.editUserEmailsPost);

router.get('/crews/:crew/:section', crews.editCrew);
router.get('/crews', crews.getAll);
router.post('/crews', crews.post);

router.get('/events/:event/calls/new', events.newEventCall);
router.get('/events/:event/calls/:call/delete', events.deleteEventCall);
router.get('/events/:event/calls/:call', events.editEventCall);
router.post('/events/:event/calls/:call', events.editEventCall);
router.get('/events/:event/:section', events.editEvent);
router.post('/events/:event/:section', events.editEvent);
router.put('/events/:permalink', events.newEvent);
router.get('/events', events.getAll);
router.post('/events', events.post);

module.exports = router;
