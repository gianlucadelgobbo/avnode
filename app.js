GLOBAL._config = require('./app/server/config.js')._config;

var express = require('express');
var app = express();

app.root = __dirname;

require('./app/server/setup')(app, express);
require('./app/server/router')(app);

app.listen(_config.port, function(){
  console.log('Express server listening on port ' + app.get('port'));
});