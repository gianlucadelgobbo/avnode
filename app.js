GLOBAL._config = require('./app/server/config.js')._config;
var express = require('express');

var app = express();

app.set('port', _config.port);
app.set('views', './app/server/views');
app.set('view engine', 'jade');

app.root = __dirname;

require('./app/server/setup')(app, express);
require('./app/server/router')(app);

app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});