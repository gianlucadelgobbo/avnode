var FFmpeg = require('fluent-ffmpeg'),
  config = require('getconfig'),
  path = require('path');

// FIXME Move to config.
var directory = config.sitepath+'/warehouse/uploads/videos/';

function webPreset(command) {
  command
    .format('mp4')
    //.audioCodec('libfaac')
    .videoCodec('libx264')
    .keepDAR();
} 
function mobilePreset(command) {
  command
    .format('mp4')
    //.audioCodec('libfaac')
    .videoCodec('libx264')
    .keepDAR()
    .size('720x?');
} 

var fileName = function(file) {
  return path.basename(file.name, path.extname(file.name));
};

module.exports.createThumbnails = function(file, next) {
  FFmpeg(directory + file.name)
    .on('filenames', function(filenames) {
      next(null, filenames);
    })
    .screenshots({
      timemarks: ['10%', '25%'],
      folder: directory,
      filename: fileName(file) + '.png'
    });
};

module.exports.mobileVersion = function(file, next) {
  var start = new Date().getTime();
  
  //FIXME Check if file is actually a transcodable video file
  var destination = directory + path.basename(file.name, path.extname(file.name)) + '-mobile.mp4';
  FFmpeg(directory + file.name)
    .preset(mobilePreset)
    .output(destination)
    .on('end', function() {
      var end = new Date().getTime();
      var seconds = ((end - start) / 60);
      console.log('Mobile version took', seconds, ' seconds');
      next(null, file);
    })
    .run();
};

module.exports.transcode = function(file, next) {
  var start = new Date().getTime();
  
  //FIXME Check if file is actually a transcodable video file
  var destination = directory + path.basename(file.name, path.extname(file.name)) + '.mp4';
  FFmpeg(directory + file.name)
    .preset(webPreset)
    .output(destination)
    .on('end', function() {
      var end = new Date().getTime();
      var seconds = ((end - start) / 60);
      console.log('Transcoding took', seconds, ' seconds');
      next(null, file);
    })
    .run();
};

module.exports.info = function(file, next) {
  FFmpeg.ffprobe(directory+file.name, function(err, metadata) {
    if (err) return next(err, null);
    next(null, metadata);
  });
};
