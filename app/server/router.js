var indexRoutes 					= require('./routes/index');
var performersRoutes 				= require('./routes/performers');
var performancesRoutes 				= require('./routes/performances');
var footageRoutes 					= require('./routes/footage');
var eventsRoutes 					= require('./routes/events');
var playlistsRoutes 				= require('./routes/playlists');
var galleriesRoutes 				= require('./routes/galleries');
var forumRoutes 					= require('./routes/forum');
var tvshowsRoutes 					= require('./routes/tvshows');
var userRoutes 				= require('./routes/user');
var apiRoutes 						= require('./routes/api');
var searchRoutes 					= require('./routes/search');

var cpanelLoginRoutes 				= require('./routes/controlpanel/login');
var cpanelConfirmRoutes 			= require('./routes/controlpanel/confirm');
var cpanelLogoutRoutes 				= require('./routes/controlpanel/logout');
var cpanelSignupRoutes 				= require('./routes/controlpanel/signup');
var cpanelUserRoutes 				= require('./routes/controlpanel/user');
var cpanelCrewsRoutes 				= require('./routes/controlpanel/crews');

var uploadRoutes 					= require('./routes/upload');
var uploadSuccessRoutes				= require('./routes/upload-success');
var imageRoutes 					= require('./routes/image');
var ajax		 					= require('./routes/ajax');

var passport 						= require('passport');

/*
var lostPasswordRoutes = require('./routes/lost-password');
var resetPasswordRoutes = require('./routes/reset-password');
var softwareRoutes = require('./routes/software');
var projectRoutes = require('./routes/project');

var unsubscribeRoutes = require('./routes/unsubscribe');
var _fpRoutes = require('./routes/_fp');
var rssRoutes = require('./routes/rss');
var facebookRoutes = require('./routes/facebook');
var facebookLPMindexRoutes = require('./routes/facebookLPMindex');
var flxer5Routes = require('./routes/flxer5');
var flxerappRoutes = require('./routes/flxerapp');
*/

module.exports = function(app) {
    // Index //
	app.get('/', indexRoutes.get);

	// ajax //
	//app.get('/ajax*', ajax.get);
	//app.post('/ajax*', ajax.post);

	// performers //
	app.get('/performers/(:filter)/(:sorting)/(:page)', performersRoutes.get);
	app.get('/performers(*)', performersRoutes.get);
	//app.post('/performers*', performersRoutes.post);

	// performances //
	app.get('/performances/(:filter)/(:sorting)/(:page)', performancesRoutes.get);
	app.get('/performances(*)', performancesRoutes.get);
	//app.post('/performances*', performancesRoutes.post);

	// footage //
	app.get('/footage/(:filter)/(:sorting)/(:page)', footageRoutes.get);
	app.get('/footage(*)', footageRoutes.get);
	//app.post('/footage*', footageRoutes.post);

	// events //
	app.get('/events/(:filter)/(:sorting)/(:page)', eventsRoutes.get);
	app.get('/events(*)', eventsRoutes.get);
	//app.post('/events*', eventsRoutes.post);

	// playlists //
	app.get('/playlists/(:filter)/(:sorting)/(:page)', playlistsRoutes.get);
	app.get('/playlists(*)', playlistsRoutes.get);
	//app.post('/playlists*', playlistsRoutes.post);

  // playlists //
	app.get('/galleries/(:filter)/(:sorting)/(:page)', galleriesRoutes.get);
	app.get('/galleries(*)', galleriesRoutes.get);

	// forum //
	//app.get('/forum ', forumRoutes.get);
	//app.post('/forum ', forumRoutes.post);

	// tvshows //
	//app.get('/tvshows*', tvshowsRoutes.get);
	app.get('/tvshows/(:filter)/(:sorting)/(:page)', tvshowsRoutes.get);
	app.get('/tvshows(*)', tvshowsRoutes.get);
	//app.post('/tvshows*', tvshowsRoutes.post);

  // local login //
  app.post(
    '/controlpanel/login',
    passport.authenticate('local', { failureRedirect: '/controlpanel/login'}),
    function(req, res) {
      console.log('redirect');
      res.redirect('/');// + req.user.permalink);
    }
  );
	app.get('/controlpanel/login', cpanelLoginRoutes.get);

  // facebook login //
  app.get('/controlpanel/login/facebook',
      passport.authenticate('facebook', {
          scope: ['public_profile', 'email']
      })
  );
  // Facebook will redirect the user to this URL after approval.
  app.get('/controlpanel/login/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect: '/',
          failureRedirect: '/controlpanel/login/'
      })
  );

  // twitter login //
  app.get('/controlpanel/login/twitter',
      passport.authenticate('twitter')
  );
  // twitter will redirect the user to this URL after approval.
  app.get('/controlpanel/login/twitter/callback',
      passport.authenticate('twitter', {
          successRedirect: '/',
          failureRedirect: '/controlpanel/login/'
      })
  );

  // google login //
  app.get('/controlpanel/login/google',
      passport.authenticate('google', { scope: ['email','profile'] })
  );
  // google will redirect the user to this URL after approval.
  app.get('/controlpanel/login/google/callback',
      passport.authenticate('google', {
          successRedirect: '/',
          failureRedirect: '/controlpanel/login/'
      })
  );

    // cp Log Out //
	app.get('/controlpanel/logout', cpanelLogoutRoutes.get);

    // local signup //
	app.get('/controlpanel/signup/', cpanelSignupRoutes.get);
	app.post('/controlpanel/signup/', cpanelSignupRoutes.post);

	// cp Confirm //
	app.get('/confirm', cpanelConfirmRoutes.get);
	//app.post('/confirm', cpanelConfirmRoutes.post);

  // FIXME
	app.use('/controlpanel*', function(req, res, next) {
    next();
    //if (!req.user) {
    //  res.redirect('/controlpanel/login/?from='+req.url);
    //} else {
    //  next();
    //}
  });

  // cp User //
  // FIXME
	app.use('/controlpanel*', function(req, res, next) {
    next();
    //if (!req.user) {
    //  res.redirect('/controlpanel/login/?from='+req.url);
    //} else {
    //  next();
    //}
  });

  app.get('/controlpanel/user(/:section?)', cpanelUserRoutes.get);
  app.post('/controlpanel/user(/:section?)', cpanelUserRoutes.post);

  app.get('/controlpanel/crews/:crew/:section', cpanelCrewsRoutes.editCrew);
  app.get('/controlpanel/crews', cpanelCrewsRoutes.getAll);
  app.post('/controlpanel/crews', cpanelCrewsRoutes.post);

	// search //
	app.get('/search', searchRoutes.get);
	//app.post('/search', searchRoutes.post);

	// upload //
	//app.get('/upload', uploadRoutes.get);
	app.post('/upload', uploadRoutes.post);
    //app.delete("/uploads/:uuid", uploadRoutes.onDeleteFile);

	// image //
	app.get('/image', imageRoutes.get);
	//app.post('/image', imageRoutes.post);

	// Api //
	app.get('/api/clients', apiRoutes.getClients);
	//app.get('/api', apiRoutes.get);

  app.get('/(:user)/events/(:event)/participate', userRoutes.participateAtUserEvent);
  app.get('/(:user)/events/(:event)', userRoutes.getUserEvent);
  app.get('/(:user)/performances/(:performance)', userRoutes.getUserPerformance);
  app.get('/(:user)/playlists/(:playlist)', userRoutes.getUserPlaylist);
  app.get('/(:user)/footage/(:footage)', userRoutes.getUserFootage);
  app.get('/(:user)/gallery/(:gallery)', userRoutes.getUserGallery);
  app.get('/(:user)/crews/(:crew)', userRoutes.getUserCrew);

  app.get('/(:user)/events', userRoutes.getUserEvents);
  app.get('/(:user)/performances', userRoutes.getUserPerformances);
  app.get('/(:user)/playlists', userRoutes.getUserPlaylists);
  app.get('/(:user)/footage', userRoutes.getUserFootages);
  app.get('/(:user)/gallery', userRoutes.getUserGalleries);
  app.get('/(:user)/crews', userRoutes.getUserCrews);

  app.get('/(:user)', userRoutes.getUser);
	//app.post('*', performerRoutes.post);
	//app.get('*', function(req, res) { res.send(404); });
};
