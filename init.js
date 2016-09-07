var config = require('getconfig');
var express = require('express');
var mongoose = require('mongoose');
var queue = require('./app/server/modules/queue');

module.exports = function(ready) {
  var app = express();
  queue.connect(function(err) {
    if (err) throw err;
    console.log('Queue connection established');
  });

  app.root = __dirname;
  require('./app/server/setup')(app, express);
  require('./app/server/router')(app);

  var server = null;
  mongoose.connect(config.mongo);
  mongoose.connection.on('error', function(error) {
    console.log('MONGOOSE ERROR', error);
  });
  mongoose.connection.once('open', function() {
    mongoose.set('debug', true);
    console.log(config.mongo);
    server = app.listen(config.port, config.host, function(){
      console.log('Express server listening on ' + config.host + ':' + config.port);
      // Needed for unit tests and wherever we need to embed the app
      app._mongoose = mongoose;
      if (ready !== null && typeof ready === 'function') {
        ready(app, server);
      }
    });
  });
};
