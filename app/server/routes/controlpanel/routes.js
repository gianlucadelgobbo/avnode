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
var validateParams = require('../../validation.js').validateParams;
var validateBody = require('../../validation.js').validateBody;

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

router.get('/user/public', user.publicGet);
router.post('/user/public', validateBody(user.publicSchemaPost), user.publicPost);
router.get('/user', function(req, res) {
  res.redirect('/controlpanel/user/public');
});

router.get('/user/image', user.imageGet);
router.post('/user/image', validateBody(user.imageSchemaPost), user.imagePost);

router.get('/user/password', user.passwordGet);
router.post('/user/password', validateBody(user.passwordSchemaPost), user.passwordPost);

router.get('/user/private', user.privateGet);
router.post('/user/private', validateBody(user.privateSchemaPost), user.privatePost);

router.get('/user/emails', user.emailsGet);
router.post('/user/emails', validateBody(user.emailsSchemaPost), user.emailsPost);

router.get('/user/connections', user.connectionsGet);
router.post('/user/connections', validateBody(user.connectionsSchemaPost), user.connectionsPost);

router.get('/crews/:crew/public', validateParams(crews.publicSchemaGet), crews.publicGet);
router.post('/crews/:crew/public', validateBody(crews.publicSchemaPost), crews.publicPost);

router.get('/crews/:crew/image', validateParams(crews.imageSchemaGet), crews.imageGet);
router.post('/crews/:crew/image', validateBody(crews.imageSchemaPost), crews.imagePost);

router.get('/crews/:crew/members', validateParams(crews.membersSchemaGet), crews.membersGet);
router.post('/crews/:crew/members', validateBody(crews.membersSchemaPost), crews.membersPost);

router.get('/crews/list', crews.listGet);
router.get('/crews', function(req, res) {
  res.redirect('/controlpanel/crews/list');
});

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
