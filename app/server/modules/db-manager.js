
var bcrypt = require('bcrypt')
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dbPort = 27017;
var dbHost = global.host;
var dbName = _config.dbName;

// use moment.js for pretty date-stamping //
var moment = require('moment');

var accounting = require('accounting');
accounting.settings = _config.accountingSettings;

var ObjectID = require('mongodb').ObjectID;

var DB = {};
	DB.db = new Db(dbName, new Server(dbHost, dbPort, {auto_reconnect: true,safe:true}, {}));
	DB.db.open(function(e, d){
		if (e) {
			console.log(e);
		} else {
			console.log('connected to database :: ' + dbName);
		}
	});
	DB.users = 			DB.db.collection('users');
	DB.footage = 		DB.db.collection('footage');
	DB.playlists = 		DB.db.collection('playlists');
	DB.performances = 	DB.db.collection('performances');
	DB.events = 		DB.db.collection('events');
	DB.tvshow = 		DB.db.collection('tvshow');
	DB.gallery = 		DB.db.collection('gallery');
	DB.categories = 	DB.db.collection('categories');
	DB.temp_users = 	DB.db.collection('temp_users');
	DB.temp = 			DB.db.collection('temp');
//	//$apiValid = array("users","footage","playlists","performances","events","tvshow","gallery");

module.exports = DB;

// Accont insertion, update & deletion methods //

/*
DB.insert_account = function(newData, callback) {
	delete newData.id;
	DB.saltAndHash(newData.pass, function(hash){
		newData.pass = hash;
	// append date stamp when record was created //
		newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
		DB.accounts.insert(newData, {safe: true}, function(err, records){
			callback(err, records);
		});
	});
}
DB.update_account = function(newData, callback) {
	DB.accounts.findOne({_id: new ObjectID(newData.id)}, function(e, o){
		o.name 		= newData.name;
		o.role 		= newData.role;
		o.email 	= newData.email;
		o.country 	= newData.country;
		if (newData.pass == ''){
			DB.accounts.save(o);
			callback(o);
		} else{
			DB.saltAndHash(newData.pass, function(hash){
				o.pass = hash;
				DB.accounts.save(o);
				callback(o);
			});
		}
	});
}
DB.delete_account = function(id, callback) {
	DB.accounts.remove({_id: new ObjectID(id)}, {safe: true}, function(err, records){
		callback(err, records);
	});
}
DB.validateLink = function(email, passHash, callback) {
	DB.accounts.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}
*/
DB.setPassword = function(login, newPass, callback) {
	DB.users.findOne({login:login}, function(e, o){
		DB.saltAndHash(newPass, function(hash){
			o.password = hash;
			DB.users.save(o, {safe:true}, function(e, res) {
				callback(e, res);
			});
		});
	});
}

DB.saltAndHash = function(pass, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(pass, salt, function(err, hash) {
			callback(hash);
		});
	});
}

DB.updateDB = function(collection, id, values, callback) {
	DB[collection].findOne({_id: new ObjectID(id)}, function(e, o){
		for(var i=0;i<values.length;i++) {
			console.dir(values[i].name);
			o[values[i].name] = values[i].value;
		}
		DB[collection].save(o, {safe:true}, function(e, success) {
			callback(e, o);
		});
	});
}

DB.updateEventRel = function(id, callback) {
	var status = {
		users:			false,
//		partners:		false,
		gallery:		false,
		performances:	false
	};
	DB.events.findOne({_id:id}, function(err, event) {
		var minievent = {_id:event._id,title:event.title,permalink:event.permalink,users:event.users,files:event.files,categories:event.categories,stats:event.stats,date_time_venue:event.date_time_venue};
		var ids = [];
		for (var item in event.users) {
			ids.push(event.users[item]._id);
			if (event.users[item].members || event.users[item].members.length) {
				for (var item2 in event.users[item].members) {
					ids.push(event.users[item].members[item2]._id);
				} 
			}
		} 
		// USERS
		DB.users.find({"_id":{$in:ids}}).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					var add = true;
					for (var a=0;a<subrecord.events.length;a++) {
						if (subrecord.events[a]._id.equals(id)) {
							subrecord.events[a] = minievent;
							add = false;
						}
					}
					if (add) subrecord.events.push(minievent);
					DB.users.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir(""+q+": "+conta);
						if (conta==subrecords.length) {
							status.users = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.users = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
		// PERFORMANCES
		var ids = [];
		for (var item in event.performances) {
			ids.push(event.performances[item]._id);
		} 
		DB.performances.find({"_id":{$in:ids}}).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					var add = true;
					for (var a=0;a<subrecord.performances.length;a++) {
						if (subrecord.performances[a]._id.equals(id)) {
							subrecord.performances[a] = minievent;
							add = false;
						}
					}
					if (add) subrecord.performances.push(minievent);
					DB.performances.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir(""+q+": "+conta);
						if (conta==subrecords.length) {
							status.performances = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.performances = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
		// GALLERY
		var ids = [];
		for (var item in event.gallery) {
			ids.push(event.gallery[item]._id);
		} 
		DB.gallery.find({"_id":{$in:ids}}).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					var add = true;
					for (var a=0;a<subrecord.gallery.length;a++) {
						if (subrecord.gallery[a]._id.equals(id)) {
							subrecord.gallery[a] = minievent;
							add = false;
						}
					}
					if (add) subrecord.gallery.push(minievent);
					DB.gallery.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir(""+q+": "+conta);
						if (conta==subrecords.length) {
							status.gallery = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.gallery = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
	});
}

DB.updateUserRel = function(id, callback) {
	var status = {
		users:			false,
		events:			false,
		footage:		false,
		playlists:		false,
		gallery:		false,
		performances:	false,
		tvshow:			false
	};
	DB.users.findOne({_id:id}, {fields:{_id:1,old_id:1,display_name:1,permalink:1,files:1,stats:1,members:1,is_crew:1}}, function(err, user){
		var q = user.is_crew ? "crews" : "members";
		var qq = user.is_crew ? {"crews._id":id} : {"members._id":id};
		delete user.is_crew;
		DB.users.find(qq).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					for (var a=0;a<subrecord[q].length;a++) {
						if (subrecord[q][a]._id.equals(id)) subrecord[q][a] = user;
					}
					DB.users.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir(""+q+": "+conta);
						if (conta==subrecords.length) {
							status.users = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.users = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
		DB.events.find({"users._id":id}).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					for (var a=0;a<subrecord.users.length;a++) {
						if (subrecord.users[a]._id==id) subrecord.users[a] = user; 
					}
					if (subrecord.partners) {
						for (var a=0;a<subrecord.partners.length;a++) {
							if (subrecord.partners[a]._id==id) subrecord.partners[a] = user; 
						}
					}
					if (subrecord.performances) {
						for (var a=0;a<subrecord.performances.length;a++) {
							for (var b=0;b<subrecord.performances[a].length;b++) {
								if (subrecord.performances[a].users[b]._id==id) subrecord.performances[a].users[b] = user; 
							}
						}
					}
					DB.events.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir("events: "+conta);
						if (conta==subrecords.length) {
							status.events = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.events = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
		DB.footage.find({"users._id":id}).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					for (var a=0;a<subrecord.users.length;a++) {
						if (subrecord.users[a]._id==id) subrecord.users[a] = user; 
					}
					DB.footage.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir("footage: "+conta);
						if (conta==subrecords.length) {
							status.footage = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.footage = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
		DB.playlists.find({"users._id":id}).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					for (var a=0;a<subrecord.users.length;a++) {
						if (subrecord.users[a]._id==id) subrecord.users[a] = user; 
					}
					DB.playlists.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir("playlists: "+conta);
						if (conta==subrecords.length) {
							status.playlists = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.playlists = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
		DB.gallery.find({"users._id":id}).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					for (var a=0;a<subrecord.users.length;a++) {
						if (subrecord.users[a]._id==id) subrecord.users[a] = user; 
					}
					DB.gallery.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir("gallery: "+conta);
						if (conta==subrecords.length) {
							status.gallery = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.gallery = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
		DB.performances.find({"users._id":id}).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					for (var a=0;a<subrecord.users.length;a++) {
						if (subrecord.users[a]._id==id) subrecord.users[a] = user; 
					}
					DB.performances.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir("performances: "+conta);
						if (conta==subrecords.length) {
							status.performances = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.performances = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
		DB.tvshow.find({"users._id":id}).toArray(function(err, subrecords){
			var conta = 0;
			if (subrecords.length) {
				subrecords.forEach(function(subrecord){
					for (var a=0;a<subrecord.users.length;a++) {
						if (subrecord.users[a]._id==id) subrecord.users[a] = user; 
					}
					DB.tvshow.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir("tvshow: "+conta);
						if (conta==subrecords.length) {
							status.tvshow = true;
							var end = true
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.tvshow = true;
				var end = true
				for (sts in status) if (status[sts]==false) end = false;
				if (end) callback(true);
			}
		});
	});
}

DB.canIeditThis = function(collection, q, user, callback) {
	//if (collection=="users") q["members._id"] = user._id;
	DB[collection].findOne(q, function(e, o){
		callback(o);
	});
}


/*

// just for testing - these are not actually being used //

DB.findById = function(id, callback) {
	DB.accounts.findOne({_id: new ObjectID(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}


DB.findByMultipleFields = function(a, callback) {
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	DB.accounts.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}

DB.getEmail = function(email, callback) {
	DB.accounts.findOne({email:email}, function(e, o){ callback(o); });
}

DB.getObjectId = function(id) {
	return DB.accounts.db.bson_serializer.ObjectID.createFromHexString(id)
}
DB.getAllRecords = function(callback) {
	DB.accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

DB.delAllRecords = function(id, callback) {
	DB.accounts.remove(); // reset accounts collection for testing //
}
*/

DB.insert_invoice = function(newData, userData, callback) {
	delete newData.id;
	var d = newData.invoice_date.split("/");
	newData.invoice_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
	if(newData.delivery_date!=""){
		d = newData.delivery_date.split("/");
		newData.delivery_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
	}
	if(newData.offer.offer_date!=""){
		d = newData.offer.offer_date.split("/");
		newData.offer.offer_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
	}
	newData.invoice_number = parseInt(newData.invoice_number);
	newData.vat_perc = parseInt(newData.vat_perc);
	unformatPrices(newData);
	//revisions
	newData.revisions = [];
	newData.revisions.push({userID : userData._id,username: userData.name,time : new Date()});
	DB.invoices.insert(newData, {safe: true}, function(err, records){
		callback(err, records);
	});
}
DB.update_invoice = function(newData, userData, callback) {
	DB.invoices.findOne({_id:new ObjectID(newData.id)}, function(e, o){
		newData._id = o._id;
		var d = newData.invoice_date.split("/");
		newData.invoice_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
		if(newData.delivery_date!=""){
			d = newData.delivery_date.split("/");
			newData.delivery_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
		}
		if(newData.offer.offer_date!=""){
			d = newData.offer.offer_date.split("/");
			newData.offer.offer_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
		}
		newData.invoice_number=parseInt(newData.invoice_number);
		newData.vat_perc=parseInt(newData.vat_perc);
		unformatPrices(newData);
		if (!newData.revisions)	newData.revisions = [];
		newData.revisions.push({userID : userData._id,username: userData.name,time : new Date()});
		delete newData.id;
		DB.invoices.save(newData);
		DB.invoices.findOne({_id:newData._id}, function(e, o){
			callback(e, o);
		});
	});
}
DB.delete_invoice = function(id, callback) {
	DB.invoices.remove({_id: new ObjectID(id)},{safe: true}, function(err, records){
		callback(err, records);
	});
}

DB.insert_offer = function(newData, userData, callback) {
	delete newData.id;
	var d = newData.offer_date.split("/");
	newData.offer_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
	if(newData.delivery_date!=""){
		d = newData.delivery_date.split("/");
		newData.delivery_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
	}
	newData.offer_number = parseInt(newData.offer_number);
	newData.vat_perc = parseInt(newData.vat_perc);
	unformatPrices(newData);
	//revisions
	newData.revisions = [];
	newData.revisions.push({userID : userData._id,username: userData.name,time : new Date()});
	DB.offers.insert(newData, {safe: true}, function(err, records){
		callback(err, records);
	});
}
DB.update_offer = function(newData, userData, callback) {
	DB.offers.findOne({_id:new ObjectID(newData.id)}, function(e, o){
		newData._id = o._id;
		var d = newData.offer_date.split("/");
		newData.offer_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
		d = newData.delivery_date.split("/");
		newData.delivery_date = new Date(parseInt(d[2]),parseInt(d[1])-1,parseInt(d[0]));
		newData.offer_number=parseInt(newData.offer_number);
		newData.vat_perc=parseInt(newData.vat_perc);
		unformatPrices(newData);
		if (!newData.revisions)	newData.revisions = [];
		newData.revisions.push({userID : userData._id,username: userData.name,time : new Date()});
		delete newData.id;
		DB.offers.save(newData);
		DB.offers.findOne({_id:newData._id}, function(e, o){
			callback(e, o);
		});
	});
}
DB.delete_offer = function(id, callback) {
	DB.invoices.remove({_id: new ObjectID(id)},{safe: true}, function(err, records){
		callback(err, records);
	});
}

DB.insert_client = function(newData, callback) {
	delete newData.id;
	DB.clients.insert(newData, {safe: true}, function(err, records){
		callback(err, records);
	});
}
DB.update_client = function(newData, callback) {
	DB.clients.findOne({_id:new ObjectID(newData.id)}, function(e, o){
		newData._id = o._id;
		delete newData.id;
		DB.clients.save(newData);
		callback(newData);
	});
}
DB.delete_client = function(id, callback) {
	DB.clients.remove({_id: new ObjectID(id)},{safe: true}, function(err, records){
		callback(err, records);
	});
}


function unformatPrices(newInvoice){
	newInvoice.subtotal=parseFloat(accounting.unformat(newInvoice.subtotal, ","));
	newInvoice.vat_amount=parseFloat(accounting.unformat(newInvoice.vat_amount, ","));
	newInvoice.shipping_costs=parseFloat(accounting.unformat(newInvoice.shipping_costs, ","));
	newInvoice.total=parseFloat(accounting.unformat(newInvoice.total, ","));
	for(var i=0;i<newInvoice.items.length;i++){
		newInvoice.items[i].price=parseFloat(accounting.unformat(newInvoice.items[i].price, ","));
		newInvoice.items[i].amount=parseFloat(accounting.unformat(newInvoice.items[i].amount, ","));
	}
}