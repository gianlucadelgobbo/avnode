var config = require('getconfig');
var im = require('imagemagick');
var fs = require('fs');
var mkdirp = require('mkdirp');

exports.getFileFormat = function (file, section, format) {
  var conf            = config.sections[section].thumbnails[format];
  if (file && file.file) {
    var source        = file.preview ? file.preview : file.file;
    var folder        = source.substring(0,source.lastIndexOf("/")+1);
    var file          = source.substring(source.lastIndexOf("/")+1,source.length);
    var formatfolder  = folder+conf.w+"x"+conf.h+"/";
    var ext           = file.substring(file.lastIndexOf(".")+1,file.length);
    var formatfile    = file.substring(0,file.lastIndexOf("."))+"_"+ext+".jpg";
    var originalImg   = folder+file;
    var formatImg     = formatfolder+formatfile;

    /*
    console.log("---------");
    console.log(config.sitepath);
    console.log(config.uploadpath);
    console.log(folder);
    console.log(file);
    console.log(formatfolder);
    console.log(formatfile);
    console.log(config.sitepath+config.uploadpath);
    console.log(config.sitepath+config.uploadpath+formatImg);
    console.log(config.sitepath+config.uploadpath+originalImg);
    console.log("---------");
    */

    if (fs.existsSync(config.sitepath+config.uploadpath+formatImg)) {
      return formatImg;
    } else if (fs.existsSync(config.sitepath+config.uploadpath+originalImg)) {
      im.crop({
        srcPath: config.sitepath+config.uploadpath+originalImg,
        dstPath: config.sitepath + config.uploadpath + formatImg,
        width: conf.w,
        height: conf.h,
        quality: 1,
        gravity: "North"
      }, function (err, stdout, stderr) {
        if (err) return console.log(err.stack || err);
        // FIXME (not available as done, need to reload)
      });
      //console.log(formatfolder + formatfile);
      return formatImg;
    } else {
      if (fs.existsSync(config.sitepath+config.uploadpath+conf.default)) {
        return this.getFileFormat({file:conf.default}, section, format);
      } else {
        return conf.default;
      }
    }
  } else {
    if (fs.existsSync(config.sitepath+config.uploadpath+conf.default)) {
      return this.getFileFormat({file:conf.default}, section, format);
    } else {
      return conf.default;
    }
  }
}
