var config = require('getconfig');
var express = require('express');
var app = express();

app.root = __dirname;

require('./app/server/setup')(app, express);
require('./app/server/router')(app);

app.listen(config.port, config.host, function(){
	console.log('Express server listening on ' + config.host + ':' + config.port);
});
