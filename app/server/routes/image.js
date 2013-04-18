var im = require('imagemagick');
var fs = require('fs');

exports.get = function get(req, res) {
	im.crop({
		srcPath: _config.sitepath+_config.uploadpath+req.query.f,
		dstPath: _config.sitepath+_config.uploadpath+req.query.f+'cropped.jpg',
		width: req.query.w ? req.query.w : 400,
		height: req.query.h ? req.query.h : 300,
		quality: 1,
		gravity: "North"
	}, function(err, stdout, stderr){
		var img = fs.readFileSync(_config.sitepath+_config.uploadpath+req.query.f+'cropped.jpg');
		res.writeHead(200, {'Content-Type': 'image/jpeg' });
		res.end(img, 'binary');
    	//res.send(req.query.f+'cropped.jpg');
		// foo
	});
}