var indexRoutes = require('./routes/index');
var logoutRoutes = require('./routes/logout');
var performersRoutes = require('./routes/performers');
var performancesRoutes = require('./routes/performances');
var footageRoutes = require('./routes/footage');
var eventsRoutes = require('./routes/events');
var playlistsRoutes = require('./routes/playlists');
var forumRoutes = require('./routes/forum');
var tvshowsRoutes = require('./routes/tvshows');
var userRoutes = require('./routes/user');
var apiRoutes = require('./routes/api');
var controlpanelRoutes = require('./routes/controlpanel');
var searchRoutes = require('./routes/search');
var importRoutes = require('./routes/import');
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

	// Import //
	app.get('/import', importRoutes.get);

	// Log Out //
	app.get('/logout', logoutRoutes.get);

	// performers //
	app.get('/performers', performersRoutes.get);
	app.post('/performers', performersRoutes.post);

	// performances //
	app.get('/performances', performancesRoutes.get);
	app.post('/performances', performancesRoutes.post);

	// footage //
	app.get('/footage', footageRoutes.get);
	app.post('/footage', footageRoutes.post);

	// events //
	app.get('/events', eventsRoutes.get);
	app.post('/events', eventsRoutes.post);

	// playlists //
	app.get('/playlists', playlistsRoutes.get);
	app.post('/playlists', playlistsRoutes.post);

	// forum //
	app.get('/forum ', forumRoutes.get);
	app.post('/forum ', forumRoutes.post);

	// tvshows //
	app.get('/tvshows', tvshowsRoutes.get);
	app.post('/tvshows', tvshowsRoutes.post);

	// controlpanel //
	app.get('/controlpanel', controlpanelRoutes.get);
	app.post('/controlpanel', controlpanelRoutes.post);

	// search //
	app.get('/search', searchRoutes.get);
	app.post('/search', searchRoutes.post);

	// Api //
	//app.get('/api/clients', apiRoutes.getClients);
	app.get('/api', apiRoutes.get);

	// all other routes: User or 404
	app.get('*', userRoutes.get);
	//app.post('*', userRoutes.post);
	//app.get('*', function(req, res) { res.send(404); });
};
