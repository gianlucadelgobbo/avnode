var indexRoutes = require('./routes/index');
var performersRoutes = require('./routes/performers');
var performancesRoutes = require('./routes/performances');
var footageRoutes = require('./routes/footage');
var eventsRoutes = require('./routes/events');
var playlistsRoutes = require('./routes/playlists');
var galleriesRoutes = require('./routes/galleries');
var forumRoutes = require('./routes/forum');
var tvshowsRoutes = require('./routes/tvshows');
var userRoutes = require('./routes/user');
var apiRoutes = require('./routes/api');
var searchRoutes = require('./routes/search');

var cpanelLoginRoutes = require('./routes/controlpanel/login');
var cpanelConfirmRoutes = require('./routes/controlpanel/confirm');
var cpanelLogoutRoutes = require('./routes/controlpanel/logout');
var cpanelSignupRoutes = require('./routes/controlpanel/signup');
var cpanelUserRoutes = require('./routes/controlpanel/user');
var cpanelCrewsRoutes = require('./routes/controlpanel/crews');
var cpanelEventsRoutes = require('./routes/controlpanel/events');

var uploadRoutes = require('./routes/upload');
var uploadSuccessRoutes = require('./routes/upload-success');
var imageRoutes = require('./routes/image');
var ajax = require('./routes/ajax');

var passport = require('passport');

var fs = require('fs');
var process = require('process');
var multer = require('multer');
var upload = multer({ dest: process.cwd() + '/warehouse/tmp/' });
var mime = require('mime');
var sha1 = require('sha1');

module.exports = function(app) {
	app.get('/', indexRoutes.get);

	app.get('/performers/(:filter)/(:sorting)/(:page)', performersRoutes.get);
	app.get('/performers(*)', performersRoutes.get);

	app.get('/performances/(:filter)/(:sorting)/(:page)', performancesRoutes.get);
	app.get('/performances(*)', performancesRoutes.get);

	app.get('/footage/(:filter)/(:sorting)/(:page)', footageRoutes.get);
	app.get('/footage(*)', footageRoutes.get);

	app.get('/events/(:filter)/(:sorting)/(:page)', eventsRoutes.get);
	app.get('/events(*)', eventsRoutes.get);

	app.get('/playlists/(:filter)/(:sorting)/(:page)', playlistsRoutes.get);
	app.get('/playlists(*)', playlistsRoutes.get);

	app.get('/galleries/(:filter)/(:sorting)/(:page)', galleriesRoutes.get);
	app.get('/galleries(*)', galleriesRoutes.get);

	app.get('/tvshows/(:filter)/(:sorting)/(:page)', tvshowsRoutes.get);
	app.get('/tvshows(*)', tvshowsRoutes.get);

  app.post(
    '/controlpanel/login',
    passport.authenticate('local', { failureRedirect: '/controlpanel/login'}),
    function(req, res) {
      console.log('redirect');
      res.redirect('/');// + req.user.permalink);
    }
  );
	app.get('/controlpanel/login', cpanelLoginRoutes.get);

  app.get('/controlpanel/login/facebook',
      passport.authenticate('facebook', {
          scope: ['public_profile', 'email']
      })
  );
  app.get('/controlpanel/login/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect: '/',
          failureRedirect: '/controlpanel/login/'
      })
  );

  app.get('/controlpanel/login/twitter',
      passport.authenticate('twitter')
  );
  app.get('/controlpanel/login/twitter/callback',
      passport.authenticate('twitter', {
          successRedirect: '/',
          failureRedirect: '/controlpanel/login/'
      })
  );

  app.get('/controlpanel/login/google',
      passport.authenticate('google', { scope: ['email','profile'] })
  );
  app.get('/controlpanel/login/google/callback',
      passport.authenticate('google', {
          successRedirect: '/',
          failureRedirect: '/controlpanel/login/'
      })
  );

	app.get('/controlpanel/logout', cpanelLogoutRoutes.get);

	app.get('/controlpanel/signup/', cpanelSignupRoutes.get);
	app.post('/controlpanel/signup/', cpanelSignupRoutes.post);

	app.get('/confirm', cpanelConfirmRoutes.get);

  // FIXME
	app.use('/controlpanel*', function(req, res, next) {
    var User = require('./models/user');
    User.findById({_id: '5170871ad931639094001b1d'}, function(err, user) {
      req.user = user;
      next();
    });
    //if (!req.user) {
    //  res.redirect('/controlpanel/login/?from='+req.url);
    //} else {
    //  next();
    //}
  });

  app.get('/controlpanel/user(/:section?)', cpanelUserRoutes.editUser);
  app.post('/controlpanel/user(/:section?)', cpanelUserRoutes.editUser);

  app.get('/controlpanel/crews/:crew/:section', cpanelCrewsRoutes.editCrew);
  app.get('/controlpanel/crews', cpanelCrewsRoutes.getAll);
  app.post('/controlpanel/crews', cpanelCrewsRoutes.post);

  app.get('/controlpanel/events/:event/calls/new', cpanelEventsRoutes.newEventCall);
  app.get('/controlpanel/events/:event/calls/:call/delete', cpanelEventsRoutes.deleteEventCall);
  app.get('/controlpanel/events/:event/calls/:call', cpanelEventsRoutes.editEventCall);
  app.post('/controlpanel/events/:event/calls/:call', cpanelEventsRoutes.editEventCall);
  app.get('/controlpanel/events/:event/:section', cpanelEventsRoutes.editEvent);
  app.post('/controlpanel/events/:event/:section', cpanelEventsRoutes.editEvent);
  app.put('/controlpanel/events/:permalink', cpanelEventsRoutes.newEvent);
  app.get('/controlpanel/events', cpanelEventsRoutes.getAll);
  app.post('/controlpanel/events', cpanelEventsRoutes.post);

	app.get('/search', searchRoutes.get);

	// image //
	app.get('/image', imageRoutes.get);

	app.get('/api/clients', apiRoutes.getClients);

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

  app.post('/api/upload/image', upload.single('image'), function (req, res, next) {
    var response = '';
    var extension = mime.extension(req.file.mimetype);
    if (extension === 'png' || extension === 'jpeg') {
      var response = '/warehouse/uploads/' + sha1(req.file.originalname) + '.' + extension;
      var destAbsolute = process.cwd() + response;
      fs.createReadStream(req.file.path).pipe(fs.createWriteStream(destAbsolute));
      fs.unlink(req.file.path);
    }
    res.send(response);
  });
};
