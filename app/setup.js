GLOBAL._config = require('../config.js')._config;

var settings = require('./server/modules/settings.js')._config
for (var key in settings) {
	GLOBAL._config[key] = settings[key];
}

GLOBAL.i18n = require('i18n');
i18n.configure({
    // setup some locales - other locales default to en silently
    locales:		_config.locales,
	defaultLocale: 	_config.defaultLocale,
    // where to register __() and __n() to, might be "global" if you know what you are doing
    register:		 global
});

//GLOBAL.i18n.configure({defaultLocale:"it"});

module.exports = function(app, exp) {
	app.configure(function(){
		app.use(i18n.init);
		app.set('views', app.root + '/app/server/views');
		app.set('view engine', 'jade');
		app.set('view options', { doctype : 'html', pretty : true });
		app.use(exp.bodyParser());
		app.use(exp.cookieParser());
		app.use(exp.session({ secret: 'super-duper-secret-secret' }));
		app.use(exp.methodOverride());
		app.use(require('stylus').middleware({ src: app.root + '/app/public' }));
		app.use(exp.static(app.root + '/app/common'));
		app.use(exp.static(app.root + '/app/public'));
	});
}