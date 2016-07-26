//var DB = require('./modules/db-manager.js');
var config = require('getconfig');
var logger = require('morgan');
var favicon = require('express-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var authentication = require('./authentication/passport');

GLOBAL.i18n = require('i18n');
i18n.configure({
  locales: config.locales,
  defaultLocale: config.defaultLocale,
  cookie: "avnode",
  directory: __dirname + '/locales',
  register: global
});

module.exports = function(app, exp) {
  // In development, we don't need that…
  if (process.env.NODE_ENV === 'staging' ||
      process.env.NODE_ENV === 'production') {
    app.use(logger('combined'));
  }

  app.use(favicon(__dirname + '/../public/img/favicon.ico'));

  app.use(i18n.init);
  app.set('port', config.port);
  app.set('views', './app/server/views');
  app.set('view engine', 'jade');
  app.locals.pretty = true;
  // FIXME: Only some config options should be global…
  app.locals.config = {
    lang: config.lang,
    sections: config.sections,
    siteurl: config.siteurl,
    locales: config.locales,
    locales_labels: config.locales_labels
  };
  app.use(cookieParser());
  app.use(bodyParser.json({limit: config.maxFileSize}));
  app.use(bodyParser.urlencoded({parameterLimit: 30000000000, limit: config.maxFileSize, extended: true }));
  app.use(methodOverride());

  app.use(session({ secret: 'avnode', resave: true, saveUninitialized: true }));

  app.use(require('stylus').middleware({ src: './app/public' }));
  app.use(exp.static('./app/public'));
  app.use(exp.static('./bower_components'));
  app.use('/warehouse', exp.static('./warehouse'));
  authentication(app);
  app.use(flash());
};
