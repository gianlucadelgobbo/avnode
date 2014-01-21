var indexRoutes 			= require('./routes/index');
var performersRoutes 		= require('./routes/performers');
var performancesRoutes 		= require('./routes/performances');
var footageRoutes 			= require('./routes/footage');
var eventsRoutes 			= require('./routes/events');
var playlistsRoutes 		= require('./routes/playlists');
var forumRoutes 			= require('./routes/forum');
var tvshowsRoutes 			= require('./routes/tvshows');
var userRoutes 				= require('./routes/user');
var apiRoutes 				= require('./routes/api');
var searchRoutes 			= require('./routes/search');
var cpanelUserRoutes		= require('./routes/controlpanel/user');
var cpanelLoginRoutes 		= require('./routes/controlpanel/login');
var cpanelConfirmRoutes 		= require('./routes/controlpanel/confirm');
var cpanelLogoutRoutes 		= require('./routes/controlpanel/logout');
var cpanelSignupRoutes 		= require('./routes/controlpanel/signup');
var cpanelUserRoutes 		= require('./routes/controlpanel/user');
var cpanelCrewsRoutes	 	= require('./routes/controlpanel/crews');
var cpanelEventsRoutes	 	= require('./routes/controlpanel/events');
var cpanelPerformancesRoutes= require('./routes/controlpanel/performances');
var cpanelTvshowsRoutes	 	= require('./routes/controlpanel/tvshows');
var cpanelFootageRoutes	 	= require('./routes/controlpanel/footage');
var cpanelPlaylistsRoutes	= require('./routes/controlpanel/playlists');
var cpanelGalleryRoutes		= require('./routes/controlpanel/gallery');



var uploadRoutes 			= require('./routes/upload');
var imageRoutes 			= require('./routes/image');
var ajax		 			= require('./routes/ajax');
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
	app.post('/', indexRoutes.post);

	// ajax //
	app.get('/ajax*', ajax.get);
	app.post('/ajax*', ajax.post);

	// performers //
	app.get('/performers*', performersRoutes.get);
	app.post('/performers*', performersRoutes.post);

	// performances //
	app.get('/performances*', performancesRoutes.get);
	app.post('/performances*', performancesRoutes.post);

	// footage //
	app.get('/footage*', footageRoutes.get);
	app.post('/footage*', footageRoutes.post);

	// events //
	app.get('/events*', eventsRoutes.get);
	app.post('/events*', eventsRoutes.post);

	// playlists //
	app.get('/playlists*', playlistsRoutes.get);
	app.post('/playlists*', playlistsRoutes.post);

	// forum //
	app.get('/forum ', forumRoutes.get);
	app.post('/forum ', forumRoutes.post);

	// tvshows //
	app.get('/tvshows*', tvshowsRoutes.get);
	app.post('/tvshows*', tvshowsRoutes.post);

	// cpanel //
	//app.get('/controlpanel', cpanelRoutes.get);
	//app.post('/controlpanel', cpanelRoutes.post);

	// cp Log In //
	app.get('/controlpanel/login', cpanelLoginRoutes.get);
	app.post('/controlpanel/login', cpanelLoginRoutes.post);

	// cp Log Out //
	app.get('/controlpanel/logout', cpanelLogoutRoutes.get);

	// cp Signup //
	app.get('/signup', cpanelSignupRoutes.get);
	app.post('/signup', cpanelSignupRoutes.post);

	// cp Confirm //
	app.get('/confirm', cpanelConfirmRoutes.get);
	app.post('/confirm', cpanelConfirmRoutes.post);

	// cp User //
	app.get('/controlpanel/user*', cpanelUserRoutes.get);
	app.post('/controlpanel/user*', cpanelUserRoutes.post);

	// cp Crews //
	app.get('/controlpanel/crews*', cpanelCrewsRoutes.get);
	app.post('/controlpanel/crews*', cpanelCrewsRoutes.post);
	
	// cp Events //
	app.get('/controlpanel/events*', cpanelEventsRoutes.get);
	app.post('/controlpanel/events*', cpanelEventsRoutes.post);
	
	// cp Performances //
	app.get('/controlpanel/performances*', cpanelPerformancesRoutes.get);
	app.post('/controlpanel/performances*', cpanelPerformancesRoutes.post);
	
	// cp tvshows //
	app.get('/controlpanel/tvshows*', cpanelTvshowsRoutes.get);
	app.post('/controlpanel/tvshows*', cpanelTvshowsRoutes.post);
	
	// cp footage //
	app.get('/controlpanel/footage*', cpanelFootageRoutes.get);
	app.post('/controlpanel/footage*', cpanelFootageRoutes.post);
	
	// cp tvshows //
	app.get('/controlpanel/playlists*', cpanelPlaylistsRoutes.get);
	app.post('/controlpanel/playlists*', cpanelPlaylistsRoutes.post);
	
	// cp tvshows //
	app.get('/controlpanel/gallery*', cpanelGalleryRoutes.get);
	app.post('/controlpanel/gallery*', cpanelGalleryRoutes.post);
	
	// search //
	app.get('/search', searchRoutes.get);
	app.post('/search', searchRoutes.post);

	// upload //
	app.get('/upload', uploadRoutes.get);
	app.post('/upload', uploadRoutes.post);

	// image //
	app.get('/image', imageRoutes.get);
	app.post('/image', imageRoutes.post);

	// Api //
	//app.get('/api/clients', apiRoutes.getClients);
	app.get('/api', apiRoutes.get);

	// all other routes: User or 404
	app.get('*', userRoutes.get);
	//app.post('*', userRoutes.post);
	//app.get('*', function(req, res) { res.send(404); });
};
