var queue = require('./app/server/modules/queue'),
  config = require('getconfig'),
  Footage = require('./app/server/models/footage'),
  Filehandler = require('./app/server/modules/filehandler'),
  _ = require('lodash'),
  mongoose = require('mongoose');

mongoose.connect(config.mongo);
mongoose.connection.on('error', function(error) {
  console.log('MONGOOSE ERROR', error);
});
mongoose.connection.once('open', function() {
  mongoose.set('debug', true);
  console.log(config.mongo);
});
queue.connect(function(err) {
  if (err) throw err;
  processQueue();
});

var processQueue = function() {
  queue.get(function(err, job) {
    if (err) throw err;
    if (job) {
      handleJob(job, processQueue);
    } else {
      setTimeout(processQueue, 1000);
    }
  });
};

var handleJob = function(job, next) {
  console.log('handle job', job.payload.type); 
  switch(job.payload.type) {
  case 'metadata':
    metadata(job, function(err, job) {
      if (err) throw err;
      queue.remove(job.ack, function(err) {
        if (err) throw err;
        console.log('metadata job finished', job.id);
        next();
      });
    });
    break;
  case 'thumbnail':
    console.log('get thumbnail jooooob');
    thumbnail(job, function(err, job) {
      queue.remove(job.ack, function(err) {
        if (err) throw err;
        console.log('thumbnail job finished', job.id);
        next();
      });
    });
    break;
  case 'transcode':
    transcode(job, function(err, job) {
      if (err) throw err;
      queue.remove(job.ack, function(err) {
        if (err) throw err;
        console.log('transcode job finished', job.id);
        next();
      });
    });
    break;
  case 'footageFile':
    handleFile(job, function(err, job) {
      if (err) throw err;
      if (job) {
        queue.remove(job.ack, function(err) {
          if (err) throw err;
          console.log('transcode job finished', job.id);
          next();
        });
      }
    });
    break;
  default: 
    console.log('Unknown type:', job.payload.type);
    setTimeout(next, 1000);
  } 
};

var handleFile = function(job, next) {
  var interval = setInterval(function() {
    queue.ping(job.ack, function(err) {
      if (err) console.log(err);
    });
  }, 5000);

  Filehandler.info(job.payload.file, function(err, metadata) {
    Footage.findByIdAndUpdate(job.payload.footage, {$set: {
      'file.metadata': metadata, 
      'file.duration': metadata.format.duration
    }}, function (err) {
      if (err) throw err;
      Filehandler.transcode(job.payload.file, function(err) {
        if (err) throw err;
        Footage.findByIdAndUpdate(job.payload.footage, {$set: {'file.status.transcoded': true}}, function (err) {
          if (err) throw err;
          Filehandler.mobileVersion(job.payload.file, function(err) {
            if (err) throw err;
            Footage.findByIdAndUpdate(job.payload.footage, {$set: {'file.status.mobile': true}}, function (err) {
              if (err) throw err;
              clearInterval(interval);
              next(null, job);
            });
          });
        });
      });
    });
  });
};

var thumbnail = function(job, next) {
  var interval = setInterval(function() {
    queue.ping(job.ack, function(err) {
      if (err) console.log(err);
    });
  }, 5000);
  Filehandler.createThumbnails(job.payload.file, function(err, result) {
    if (err) throw err;
    var previews = result;
    if (!_.isArray(result)) {
      previews = [result];
    }
    Footage.findByIdAndUpdate(job.payload.footage, {$set: {'file.previews': previews, 'file.status.preview': true}}, {}, function (err) {
      if (err) throw err;
      clearInterval(interval);
      next(null, job);
    });
  });
};

var transcode = function(job, next) {
  var interval = setInterval(function() {
    queue.ping(job.ack, function(err) {
      if (err) console.log(err);
    });
  }, 5000);
  Filehandler.transcode(job.payload.file, function(err) {
    if (err) throw err;
    Footage.findbyidandupdate(job.payload.footage, {$set: {'file.status.transcoded': true}}, function (err) {
      if (err) throw err;
      clearInterval(interval);
      next(null, job);
    });
  });
};

var metadata = function(job, next) {
  var interval = setInterval(function() {
    queue.ping(job.ack, function(err) {
      if (err) console.log(err);
    });
  }, 5000);
  Filehandler.info(job.payload.file, function(err, metadata){
    Footage.findByIdAndUpdate(job.payload.footage, {$set: {
      'file.metadata': metadata, 
      'file.duration': metadata.format.duration
    }}, function (err) {
      if (err) throw err;
      clearInterval(interval);
      next(null, job);
    });
  });
};
