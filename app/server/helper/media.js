var config = require('getconfig');
var im = require('imagemagick');
var fs = require('fs');
var mkdirp = require('mkdirp');

exports.getFileFormat = function (source, conf) {
	if (source) {
		var folder = 		source.substring(0,source.lastIndexOf("/")+1);
		var file = 			source.substring(source.lastIndexOf("/")+1,source.length);
		var ext = 			file.substring(file.lastIndexOf(".")+1,file.length);
		var previewfile = 	file.substring(0,file.lastIndexOf("."))+"_"+ext+".png";
		var formatfile = 	file.substring(0,file.lastIndexOf("."))+"_"+ext+".jpg";
		var formatfolder = 	folder+conf.w+"x"+conf.h+"/";
		/*
		console.log("---------");
		console.log(config.sitepath);
		console.log(config.uploadpath);
		console.log(folder);
		console.log(file);
		console.log(formatfolder);
		console.log(formatfile);
		console.log(config.sitepath+config.uploadpath+formatfolder+formatfile);
		console.log(config.sitepath+config.uploadpath+folder+file);
		console.log("---------");
		 */
		//console.log(_config.sitepath+_config.uploadpath+formatfolder+formatfile);
		if (fs.existsSync(config.sitepath+config.uploadpath+formatfolder+formatfile)) {
			return formatfolder+formatfile;
		} else {
			var imgExt = ['jpg','jpeg','gif','png'];
			var originalImg = fs.existsSync(config.sitepath+config.uploadpath+folder+"preview_files/"+previewfile) ? config.sitepath+config.uploadpath+folder+"preview_files/"+previewfile : fs.existsSync(config.sitepath+config.uploadpath+folder+file) && imgExt.indexOf(ext)!=-1  ? config.sitepath+config.uploadpath+folder+file : false;
			if (originalImg) {
				if(!fs.existsSync(config.sitepath + config.uploadpath + formatfolder)) mkdirp.sync(config.sitepath + config.uploadpath + formatfolder);
				im.crop({
					srcPath: originalImg,
					dstPath: config.sitepath + config.uploadpath + formatfolder + formatfile,
					width: conf.w,
					height: conf.h,
					quality: 1,
					gravity: "North"
				}, function (err, stdout, stderr) {
					console.log(err);
					if (err) return console.log(err.stack || err);
					// FIXME (not available as done, need to reload)
					return formatfolder + formatfile;
				});
			} else if (fs.existsSync(config.sitepath+config.uploadpath+"/warehouse/defaults/"+conf.default)) {
				return this.getFileFormat("/warehouse/defaults/"+conf.default, conf);
			} else {
				return "/warehouse/defaults/"+conf.default;
			}
		}
	} else {
		return "/warehouse/defaults/"+conf.default;
	}
}
