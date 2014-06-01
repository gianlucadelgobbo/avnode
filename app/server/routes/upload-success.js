var DB = require('../modules/db-manager');
var Fnc = require('../modules/general-functions');
var formidable = require('formidable');
var util = require('util');
var im = require('imagemagick');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
 
fs.mkdirParent = function(dirPath, mode, callback) {
  //Call the standard fs.mkdir
  fs.mkdir(dirPath, mode, function(error) {
    //When it fail in this way, do the custom steps
    if (error && error.errno === 34) {
      //Create all the parents recursively
      fs.mkdirParent(path.dirname(dirPath), mode, callback);
      //And then the directory
      fs.mkdirParent(dirPath, mode, callback);
    }
    //Manually run the callback since we used our own callback to do all these
  console.log(dirPath);
    callback && callback(error);
  });
};

exports.post = function post(req, res) {
	var form = new formidable.IncomingForm();
	var files = [];
	var fields = [];
	form.uploadDir = _config.uploadedFilesPath;
	form.encoding = 'utf-8';
	/*
	console.dir(req);
	form.keepExtensions = true;
	form.type
	Either 'multipart' or 'urlencoded' depending on the incoming request.
	
	form.maxFieldsSize = 2 * 1024 * 1024;
	Limits the amount of memory a field (not file) can allocate in bytes. If this value is exceeded, an 'error' event is emitted. The default size is 2MB.
	
	form.maxFields = 0;
	Limits the number of fields that the querystring parser will decode. Defaults to 0 (unlimited).
	
	form.hash = false;
	If you want checksums calculated for incoming files, set this to either 'sha1' or 'md5'.
	
	form.bytesReceived
	The amount of bytes received for this form so far.
	form.bytesExpected	

	form.parse(req, function(err, fields, files) {
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('received upload:\n\n');
		res.end(util.inspect({fields: fields, files: files}));
	});

	*/
	form
  	.on('field', function(field, value) {
		//console.log(field, value);
		fields.push([field, value]);
  	})
  	.on('file', function(field, file) {
		//console.log(field, file);
		files.push([field, file]);
  	})
  	.on('end', function() {
  		var count;
		//console.log('-> upload done');
		//res.writeHead(200, {'content-type': 'text/plain'});
		var result = [];
		files.forEach(function(item,index,e){
			im.identify(item[1].path, function(err, features){
				delete item[1]._writeStream;
				delete item[1].hash;
				delete item[1].size;
				item[1].format = features.format;
				item[1].width = features.width;
				item[1].height = features.height;
				var file = item[1].path;
				if (req.query.id) {
					var d = new Date();
					newfolder = "/warehouse/"+d.getFullYear()+"/"+("0" + (d.getMonth() + 1)).slice(-2)+"/";
					mkdirp.sync(_config.sitepath+_config.uploadpath+newfolder);
			 		fs.renameSync(item[1].path,_config.sitepath+_config.uploadpath+newfolder+item[1].name);
			 		file = newfolder+item[1].name;
					
				}
				result.push({file:file,name:item[1].name,type:item[1].type,height:features.height,width:features.width,format:features.format,lastModifiedDate:item[1].lastModifiedDate});
				if (err) throw err;
			 	console.dir(files);
		    	if (e.length-1==index) {
					if (req.query.id) {
						DB.updateDB("users",req.query.id,[{name:"files",value:result}], function() {
							res.send(result);
						});
					} else {
						res.send(result);
					}
				}
			});
		})
		//res.end(files);
  	});
	form.parse(req);
};
