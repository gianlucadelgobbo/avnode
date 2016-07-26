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
var superadmin = require('./superadmin');
var validateParams = require('../../validation.js').validateParams;
var validateBody = require('../../validation.js').validateBody;

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/controlpanel/login',
    successRedirect: '/controlpanel/user',
    failureFlash: true
  })
);
router.get('/login', login.get);

router.get('/login/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email']
    })
);
router.get('/login/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/controlpanel/user',
      failureRedirect: '/controlpanel/login'
    })
);

router.get('/login/twitter',
    passport.authenticate('twitter')
);
router.get('/login/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/controlpanel/user',
      failureRedirect: '/controlpanel/login'
    })
);

router.get('/login/google',
    passport.authenticate('google', { scope: ['email','profile'] })
);
router.get('/login/google/callback',
    passport.authenticate('google', {
      successRedirect: '/controlpanel/user',
      failureRedirect: '/controlpanel/login'
    })
);

router.get('/logout', logout.get);

router.get('/signup/', signup.get);
router.post('/signup/', signup.post);

router.get('/confirm', confirm.get);

// FIXME
router.use('/*', function(req, res, next) {
  if (!req.user) {
    //next();
    res.redirect('/controlpanel/login');
  } else {
    next();
  }
});

router.get('/user/public',              user.publicGet);
router.post('/user/public',             validateBody(user.publicSchemaPost), user.publicPost);
router.get('/user', function(req, res) {
  res.redirect('/controlpanel/user/public');
});

router.get('/user/image',               user.imageGet);
router.post('/user/image',              validateBody(user.imageSchemaPost), user.imagePost);
router.get('/user/password',            user.passwordGet);
router.post('/user/password',           validateBody(user.passwordSchemaPost), user.passwordPost);
router.get('/user/private',             user.privateGet);
router.post('/user/private',            validateBody(user.privateSchemaPost), user.privatePost);
router.get('/user/emails',              user.emailsGet);
router.post('/user/emails',             validateBody(user.emailsSchemaPost), user.emailsPost);
router.get('/user/connections',         user.connectionsGet);
router.post('/user/connections',        validateBody(user.connectionsSchemaPost), user.connectionsPost);


router.get('/crews/:crew/public',       validateParams(crews.publicSchemaGet), crews.publicGet);
router.post('/crews/:crew/public',      validateBody(crews.publicSchemaPost), crews.publicPost);
router.get('/crews/:crew/image',        validateParams(crews.imageSchemaGet), crews.imageGet);
router.post('/crews/:crew/image',       validateBody(crews.imageSchemaPost), crews.imagePost);
router.get('/crews/:crew/members',      validateParams(crews.membersSchemaGet), crews.membersGet);
router.post('/crews/:crew/members',     validateBody(crews.membersSchemaPost), crews.membersPost);
router.get('/crews/list', crews.listGet);
router.get('/crews', function(req, res) {
  res.redirect('/controlpanel/crews/list');
});

/*
router.get('/organizations/:organization/public',    validateParams(organizations.publicSchemaGet), organizations.publicGet);
router.post('/organizations/:organization/public',       validateBody(organizations.publicSchemaPost), organizations.publicPost);
router.get('/organizations/:organization/image',    validateParams(organizations.imageSchemaGet), organizations.imageGet);
router.post('/organizations/:organization/image',       validateBody(organizations.imageSchemaPost), organizations.imagePost);
router.get('/organizations/:organization/logo',        validateParams(organizations.logoSchemaGet), organizations.logoGet);
router.post('/organizations/:organization/logo',       validateBody(organizations.logoSchemaPost), organizations.logoPost);
router.get('/organizations/:organization/members',    validateParams(organizations.membersSchemaGet), organizations.membersGet);
router.post('/organizations/:organization/members',   validateBody(organizations.membersSchemaPost), organizations.membersPost);
router.get('/organizations/:organization/private',    validateParams(organizations.privateSchemaGet), organizations.privateGet);
router.post('/organizations/:organization/private',   validateBody(organizations.privateSchemaPost), organizations.privatePost);
router.get('/organizations/:organization/billing',    validateParams(organizations.billingSchemaGet), organizations.billingGet);
router.post('/organizations/:organization/billing',   validateBody(organizations.billingSchemaPost), organizations.billingPost);
router.get('/organizations/list',                       organizations.listGet);
router.get('/organizations', function(req, res) {
res.redirect('/controlpanel/organizations/list');
});

router.get('/performances/:performance/public',        validateParams(performances.publicSchemaGet), performances.publicGet);
router.post('/performances/:performance/public',       validateBody(performances.publicSchemaPost), performances.publicPost);
router.get('/performances/:performance/image',        validateParams(performances.imageSchemaGet), performances.imageGet);
router.post('/performances/:performance/image',       validateBody(performances.imageSchemaPost), performances.imagePost);
router.get('/performances/:performance/performers',    validateParams(performances.performersSchemaGet), performances.performersGet);
router.post('/performances/:performance/performers',   validateBody(performances.performersSchemaPost), performances.performersPost);
router.get('/performances/:performance/events',        validateParams(performances.eventsSchemaGet), performances.eventsGet);
router.post('/performances/:performance/events',       validateBody(performances.eventsSchemaPost), performances.eventsPost);
router.get('/performances/:performance/visibility',    validateParams(performances.visibilitySchemaGet), performances.visibilityGet);
router.post('/performances/:performance/visibility',   validateBody(performances.visibilitySchemaPost), performances.visibilityPost);
router.get('/performances/:performance/permissions',  validateParams(performances.permissionsSchemaGet), performances.permissionsGet);
router.post('/performances/:performance/permissions',   validateBody(performances.permissionsSchemaPost), performances.permissionsPost);
router.get('/performances/list',                        performances.listGet);
router.get('/performances', function(req, res) {
    res.redirect('/controlpanel/performances/list');
});

*/
router.get('/events/:event/public',        validateParams(events.publicSchemaGet), events.publicGet);
router.post('/events/:event/public',       validateBody(events.publicSchemaPost), events.publicPost);
router.get('/events/:event/image',        validateParams(events.imageSchemaGet), events.imageGet);
router.post('/events/:event/image',       validateBody(events.imageSchemaPost), events.imagePost);
router.get('/events/:event/performances',  validateParams(events.performancesSchemaGet), events.performancesGet);
router.post('/events/:event/performances',   validateBody(events.performancesSchemaPost), events.performancesPost);
router.get('/events/:event/partners',    validateParams(events.partnersSchemaGet), events.partnersGet);
router.post('/events/:event/partners',       validateBody(events.partnersSchemaPost), events.partnersPost);
router.get('/events/:event/galleries',    validateParams(events.galleriesSchemaGet), events.galleriesGet);
router.post('/events/:event/galleries',   validateBody(events.galleriesSchemaPost), events.galleriesPost);
router.get('/events/:event/permissions',  validateParams(events.permissionsSchemaGet), events.permissionsGet);
router.post('/events/:event/permissions',   validateBody(events.permissionsSchemaPost), events.permissionsPost);
router.get('/events/:event/visibility',    validateParams(events.visibilitySchemaGet), events.visibilityGet);
router.post('/events/:event/visibility',   validateBody(events.visibilitySchemaPost), events.visibilityPost);
router.get('/events/:event/calls',        validateParams(events.callsSchemaGet), events.callsGet);
router.post('/events/:event/calls',       validateBody(events.callsSchemaPost), events.callsPost);
router.get('/events/list', events.listGet);
router.get('/events', function(req, res) {
  res.redirect('/controlpanel/events/list');
});
/*
router.get('/tvshows/:tvshow/public',      validateParams(tvshows.publicSchemaGet), tvshows.publicGet);
router.post('/tvshows/:tvshow/public',       validateBody(tvshows.publicSchemaPost), tvshows.publicPost);
router.get('/tvshows/:tvshow/image',      validateParams(tvshows.imageSchemaGet), tvshows.imageGet);
router.post('/tvshows/:tvshow/image',       validateBody(tvshows.imageSchemaPost), tvshows.imagePost);
router.get('/tvshows/list', tvshows.listGet);
router.get('/tvshows', function(req, res) {
    res.redirect('/controlpanel/tvshows/list');
});

router.get('/footage/:footage/public',      validateParams(footage.publicSchemaGet), footage.publicGet);
router.post('/footage/:footage/public',     validateBody(footage.publicSchemaPost), footage.publicPost);
router.get('/footage/:footage/image',      validateParams(footage.imageSchemaGet), footage.imageGet);
router.post('/footage/:footage/image',       validateBody(footage.imageSchemaPost), footage.imagePost);
router.get('/footage/list', footage.listGet);
router.get('/footage', function(req, res) {
    res.redirect('/controlpanel/footage/list');
});

router.get('/playlists/:playlist/public',  validateParams(playlists.publicSchemaGet), playlists.publicGet);
router.post('/playlists/:playlist/public',   validateBody(playlists.publicSchemaPost), playlists.publicPost);
router.get('/playlists/:playlist/footage',  validateParams(playlists.footageSchemaGet), playlists.footageGet);
router.post('/playlists/:playlist/footage', validateBody(playlists.footageSchemaPost), playlists.footagePost);
router.get('/playlists/list', playlists.listGet);
router.get('/playlists', function(req, res) {
    res.redirect('/controlpanel/playlists/list');
});

router.get('/galleries/:gallery/public',  validateParams(galleries.publicSchemaGet), galleries.publicGet);
router.post('/galleries/:gallery/public',   validateBody(galleries.publicSchemaPost), galleries.publicPost);
router.get('/galleries/list', galleries.listGet);
router.get('/galleries', function(req, res) {
    res.redirect('/controlpanel/galleries/list');
});
*/
router.get('/superadmin/categories',    validateParams(superadmin.categoriesSchemaGet), superadmin.categoriesGet);
router.post('/superadmin/categories',       validateBody(superadmin.categoriesSchemaPost), superadmin.categoriesPost);
router.get('/superadmin/vjtelevision',    /*validateParams(superadmin.vjtelevisionSchemaGet), */superadmin.vjtelevisionGet);
router.post('/superadmin/vjtelevision',   /*validateBody(superadmin.vjtelevisionSchemaPost), */superadmin.vjtelevisionPost);
router.get('/superadmin/organizations',    /*validateParams(organizations.organizationsSchemaGet), */superadmin.organizationsGet);
router.post('/superadmin/organizations',   /*validateBody(organizations.organizationsSchemaPost), */superadmin.organizationsPost);
//router.get('/superadmin/list', superadmin.listGet);
router.get('/superadmin', function(req, res) {
  res.redirect('/controlpanel/superadmin/vjtelevision');
});





router.get('/events/:event/calls/new', validateParams(events.newCallSchemaGet), events.newCallGet);
router.get('/events/:event/calls/:call/delete', validateParams(events.deleteCallSchemaGet), events.deleteCallGet);
router.get('/events/:event/calls/:call', validateParams(events.editCallSchemaGet), events.editCallGet);
router.post('/events/:event/calls/:call', validateBody(events.editCallSchemaPost), events.editCallPost);
router.get('/events', events.listGet);

module.exports = router;
