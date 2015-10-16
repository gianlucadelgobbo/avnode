var im = require('imagemagick');
var fs = require('fs');
var config = require('getconfig');

exports.get = function get(req, res) {
	im.crop({
		srcPath: config.sitepath+config.uploadpath+req.query.f,
		dstPath: config.sitepath+config.uploadpath+req.query.f+'cropped.jpg',
		width: req.query.w ? req.query.w : 400,
		height: req.query.h ? req.query.h : 300,
		quality: 1,
		gravity: "North"
	}, function(err, stdout, stderr){
		var img = fs.readFileSync(config.sitepath+config.uploadpath+req.query.f+'cropped.jpg');
		res.writeHead(200, {'Content-Type': 'image/jpeg' });
		res.end(img, 'binary');
    	//res.send(req.query.f+'cropped.jpg');
		// foo
	});
}
