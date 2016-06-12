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

// FIXME, upload routes working?
var uploadRoutes = require('./routes/upload');
var uploadSuccessRoutes = require('./routes/upload-success');

var imageRoutes = require('./routes/image');

var controlpanelRoutes = require('./routes/controlpanel/routes');

module.exports = function(app) {
	app.get('/', indexRoutes.get);

  app.use('/controlpanel', controlpanelRoutes);
  app.use('/api', apiRoutes);

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

	app.get('/search', searchRoutes.get);

	app.get('/image', imageRoutes.get);

  app.get('/(:user)/events/(:event)/participate', userRoutes.participateAtUserEvent);
  app.get('/(:user)/events/(:event)', userRoutes.getUserEvent);
  //app.get('/(:user)/events/(:event)/participate', userRoutes.getUserEventParticipate);
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
};
