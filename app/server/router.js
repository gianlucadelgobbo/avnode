var indexRoutes 		= require('./routes/index');
var performersRoutes 	= require('./routes/performers');
var eventsRoutes 		= require('./routes/events');
var performancesRoutes 	= require('./routes/performances');
var tvshowsRoutes 		= require('./routes/tvshows');
var footagesRoutes 		= require('./routes/footages');
var playlistsRoutes 	= require('./routes/playlists');
var galleriesRoutes 	= require('./routes/galleries');
//var forumRoutes 		= require('./routes/forum');
var userRoutes 			= require('./routes/user');
var apiRoutes 			= require('./routes/api');
var swfdataRoutes 		= require('./routes/swfdata');

var searchRoutes 		= require('./routes/search');

// FIXME, upload routes working?
var uploadRoutes 		= require('./routes/upload');
var uploadSuccessRoutes = require('./routes/upload-success');

var imageRoutes 		= require('./routes/image');

var controlpanelRoutes 	= require('./routes/controlpanel/routes');

module.exports = function(app) {
	app.get('/', indexRoutes.get);

	app.use('/controlpanel', controlpanelRoutes);
	app.use('/api', apiRoutes);

	app.get('/performers/(:filter)/(:sorting)/(:page)', performersRoutes.get);
	app.get('/performers(*)', performersRoutes.get);

	app.get('/events/(:filter)/(:sorting)/(:page)', eventsRoutes.get);
	app.get('/events(*)', eventsRoutes.get);

	app.get('/performances/(:filter)/(:sorting)/(:page)', performancesRoutes.get);
	app.get('/performances(*)', performancesRoutes.get);

	app.get('/tvshows/(:filter)/(:sorting)/(:page)', tvshowsRoutes.get);
	app.get('/tvshows(*)', tvshowsRoutes.get);

	app.get('/footage/(:filter)/(:sorting)/(:page)', footagesRoutes.get);
	app.get('/footage(*)', footagesRoutes.get);

	app.get('/playlists/(:filter)/(:sorting)/(:page)', playlistsRoutes.get);
	app.get('/playlists(*)', playlistsRoutes.get);

	app.get('/galleries/(:filter)/(:sorting)/(:page)', galleriesRoutes.get);
	app.get('/galleries(*)', galleriesRoutes.get);

	app.get('/search', searchRoutes.get);

	app.get('/swfdata/(:user)/footage/(:footage)', swfdataRoutes.get);
	app.get('/embed/(:user)/footage/(:footage)', swfdataRoutes.get);
	app.get('/download/(:user)/footage/(:footage)', swfdataRoutes.get);
	app.get('/endpage/(:user)/footage/(:footage)', swfdataRoutes.get);

	app.get('/image', imageRoutes.get);

	app.get('/(:user)/events/(:event)/participate', 	userRoutes.participateAtUserEvent);
	app.get('/(:user)/events/(:event)', 				userRoutes.getUserEvent);
	app.get('/(:user)/performances/(:performance)', 	userRoutes.getUserPerformance);
	app.get('/(:user)/tvshows/(:tvshow)', 				userRoutes.getUserTvshow);
	app.get('/(:user)/footage/(:footage)', 				userRoutes.getUserFootage);
	app.get('/(:user)/playlists/(:playlist)', 			userRoutes.getUserPlaylist);
	app.get('/(:user)/galleries/(:gallery)', 			userRoutes.getUserGallery);
	//app.get('/(:user)/crews/(:crew)', 					userRoutes.getUserCrew);

	app.get('/(:user)/events', 							userRoutes.getUserEvents);
	app.get('/(:user)/performances', 					userRoutes.getUserPerformances);
	app.get('/(:user)/tvshows', 						userRoutes.getUserTvshows);
	app.get('/(:user)/footage', 						userRoutes.getUserFootages);
	app.get('/(:user)/playlists', 						userRoutes.getUserPlaylists);
	app.get('/(:user)/galleries', 						userRoutes.getUserGalleries);
	app.get('/(:user)/crews', 							userRoutes.getUserCrews);

	app.get('/(:user)', 								userRoutes.getUser);
};
