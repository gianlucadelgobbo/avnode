var im = require('imagemagick');
var fs = require('fs');
var mkdirp = require('mkdirp');

// FIXME
// Refactor and write a test
exports.getFileFormat = function (obj, w, h) {
	if (obj && obj.length && obj[0].file) {
		var source = 		obj[0].file;
		var folder = 		source.substring(0,source.lastIndexOf("/")+1);
		var file = 			source.substring(source.lastIndexOf("/")+1,source.length);
		var ext = 			file.substring(file.lastIndexOf(".")+1,file.length);
		var previewfile = 	file.substring(0,file.lastIndexOf("."))+"_"+ext+".png";
		var formatfile = 	file.substring(0,file.lastIndexOf("."))+"_"+ext+".jpg";
		var formatfolder = 	folder+w+"x"+h+"/";
		/*
		console.log("---------");
		console.log(_config.sitepath);
		console.log(_config.uploadpath);
		console.log(folder);
		console.log(file);
		console.log(formatfolder);
		console.log(formatfile);
		console.log(_config.sitepath+_config.uploadpath+formatfolder+formatfile);
		console.log(_config.sitepath+_config.uploadpath+folder+file);
		console.log("---------");
		*/
		//console.log(_config.sitepath+_config.uploadpath+formatfolder+formatfile);
		if (fs.existsSync(config.sitepath+config.uploadpath+formatfolder+formatfile)) {
			return formatfolder+formatfile;
		} else {
			var imgExt = ['jpg','jpeg','gif','png'];
			var originalImg = fs.existsSync(config.sitepath+config.uploadpath+folder+"preview_files/"+previewfile) ? config.sitepath+config.uploadpath+folder+"preview_files/"+previewfile : fs.existsSync(config.sitepath+config.uploadpath+folder+file) && imgExt.indexOf(ext)!=-1  ? config.sitepath+config.uploadpath+folder+file : false;
			if (originalImg) {
				mkdirp.sync(config.sitepath+config.uploadpath+formatfolder);
				im.crop({
					srcPath: originalImg,
					dstPath: config.sitepath+config.uploadpath+formatfolder+formatfile,
					width: w,
					height: h,
					quality: 1,
					gravity: "North"
				}, function(err, stdout, stderr){

					if (err) return console.error(err.stack || err);
				});
                return formatfolder+formatfile;
			} else {
				return "/warehouse/defaults/"+w+"x"+h+".jpg";
			}
		}
	} else {
		return "/warehouse/defaults/"+w+"x"+h+".jpg";
	}
}
