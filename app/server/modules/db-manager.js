var bcrypt = require('bcrypt-nodejs');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var Fnc = require('./general-functions');

var dbPort = _config.dbPort;
var dbHost = _config.dbHost;
var dbName = _config.dbName;

var moment = require('moment');

var accounting = require('accounting');
accounting.settings = _config.accountingSettings;

var ObjectID = require('mongodb').ObjectID;
var request = require('request');

var DB = {};
	DB.db = new Db(dbName, new Server(dbHost, dbPort, {auto_reconnect: true,safe:true}, {}));
	DB.db.open(function(e, d){
		if (e) {
			console.log(e);
		} else {
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
            console.log('connected to database :: ' + dbName);
		}
	});

module.exports = DB;

DB.validateFormLogin = function (login, password,callback) {
    var e = [];
	console.log("stocazzo");
	console.log(login);
    DB.users.findOne({login:login}, function(err, result) {
		console.log(result);
        if (result == null){
			console.log("stocazzo2");
            e.push({name:"user",m:__("User not found")});
            callback(e, result);
        } else {
            if (result.password) {
                bcrypt.compare(password, result.password, function(err, res) {
                    if (res) {
                        //console.dir("login interno");
                        callback(e, result);
                    } else {
                        e.push({name:"user",m:__("Login failed")});
                        callback(e, result);
                    }
                });
            } else {
                request.post({
                    uri:"https://flxer.net/api/login",
                    headers:{'content-type': 'application/x-www-form-urlencoded'},
                    body:require('querystring').stringify({login:login, password:password})
                },function(err, res, body){
                    var ress = JSON.parse(body);
                    if (ress.login) {
                        DB.setPassword(login, password, function(e, o) {
                            callback(e, result);
                        });
                    } else {
                        e.push({name:"user",m:__("Login failed")});
                        callback(e, result);
                    }
                });
            }
        }
    });
};


DB.facebookFindOrCreate = function(profile, callback){
    DB.users.findOne({"facebook.id":profile.id}, function(err, res){
        if (!res) {
            console.log("NON TROVATO 1 !!!");
            DB.users.findOne({"emails.email":profile.emails[0].value}, function(err, res){
                if (!res) {
                    console.log("NON TROVATO 2 !!!");
                    DB.facebookCreate(profile, function(err, res) {
                        callback(err, res);
                    });
                } else {
                    console.log("TROVATO 2 !!!");
                    res.facebook = profile;
                    DB.users.save(res, {safe:true}, function(e, resSave) {
                        console.log("salvato 2 !!!");
                        callback(e, res);
                    });
                }
            });
        } else {
            console.log("TROVATO 1 !!!");
            callback(err, res);
        }
    });
}
DB.facebookFind = function(profile, callback){
    DB.users.findOne({"facebook.id":profile.id}, function(err, res){
        if (!res) {
            console.log("NON TROVATO 1 !!!");
            res.redirect('/controlpanel/login/');
        } else {
            console.log("TROVATO 1 !!!");
            callback(err, res);
        }
    });
}
DB.facebookCreate = function(profile, callback) {
    var lang = profile._json.locale.split("_")[0];
    for(var a=0;a<profile.emails.length;a++){
        profile.emails[a].email = profile.emails[a].value;
        delete profile.emails[a].value;
        profile.emails[a].public = 0;
        profile.emails[a].valid = 1;
        profile.emails[a].public = a===0 ? 1 :0;
        profile.emails[a].mailinglists = _config.mailinglists;
    }
    var o = {
        name: profile.name.givenName,
        surname: profile.name.familyName,
        display_name: profile.displayName,
        gender: profile.gender == 'male' ? 'M' : profile.gender == 'female' ? 'F' : 'Other',
        is_crew: 0,
        lang: _config.locales.indexOf(lang),
        public: 1,
        //birth_date: "Mon Feb 28 1966 00:00:00 GMT+0100 (CET)",
        creation_date: new Date(),
        emails:profile.emails,
        files: [ { file: '/warehouse/2012/01/romacreativa_10.jpg' } ],
        locations:
            [ { city: 'Roma',
                country: 'Italy',
                lat: 41.8929163,
                lng: 12.482519899999943 } ],
        permalink: Fnc.getPermalink(profile.displayName),
        stats: {
            events: 0,
            performances: 0,
            playlists: 0,
            footage: 0,
            gallery: 0,
            crews: 0
        },
        text: { en: 'Very interested in any kind of avant-garde, costume, music, art and experimentation, it is updated on all sorts of innovation in technology and communications.\r\n\r\nIn 1996 he founded and coordinates the various activities dealing Flyer Communication Srl well as the managerial tasks and strategic development of all applications Flash Flyer.\r\n\r\nIn 1999 he founded Shockart.net that quickly becomes a point of reference for the Web Art and especially for the productions in Shockwave Flash, features exhibitions in Rome, Valencia, San Francisco, New York.\r\n\r\nIn 2001 he created a AV mixer FLxER based on Flash tecnology, that is presented in the most varied occasions, it is used to mix vector graphics, audio, video, text and interactive media, in live performance.\r\n\r\nFrom 2002 to 2005 taught at the IED as teacher in the Master in Web Design and Strategy, and in 2006 taught "Flash" in the course of Graphics for three years.\r\n\r\nHe has also edited several interventions in the Faculty of Engineering, University of Sannio, Department of Linguistic Practices and Text Analysis at the University of Bari, in the Faculty of Humanities, University of Tor Vergata, University of Perugia , at the Biennale of Young Artists of Athens (2003), the Flash Forward in San Francisco and New York, the Center for Studies in Szentendre (Budapest), at Sonar in Barcelona, the RESFEST of Rome, the Biennial of Valencia, the Faculty of Fine Arts in Barcelona at the Galleria d\'Arte Moderna e Contemporanea di Bergamo, the Galleria d\'Arte Moderna in Rome, at the Faculty of Architecture of Wisdom.\r\n\r\nIn 2004 he won the prize Bardi IBM Web award with the site of the Photograpy International Festival of Rome in the same year he started writing for Next Exit magazine and others on the Web.\r\n\r\nIn 2006, Achille Bonito Oliva gives the ABO Silver, an award for having outstanding accomplishments of Web Art, as one of the protagonists of international contemporary art.',
            it: 'Molto interessato ad ogni tipo di avanguardia, costume, musica, arte e sperimentazione, è sempre aggiornato su ogni genere di innovazione nelle tecnologie e nella comunicazione. \r\n\r\nNel 1996 fonda e coordina le diverse attività di Flyer Communication S.r.l occupandosi oltre che dei compiti manageriali e strategici, dello sviluppo di tutte le applicazioni Flash di Flyer. \r\n\r\nNel 1999 fonda Shockart.net che diventa in poco tempo uno dei punti di riferimento per la Web Art ed in particolare per le produzioni realizzate in Shockwave Flash; realizza mostre a Roma, Valencia, San Francisco, New York. \r\n\r\nNel 2001 crea FLxER un mixer video realizzato in Flash, presentato continuamente nelle più diverse occasioni, utilizzato per mixare grafica vettoriale, audio, video, testo e media interattivi, nella realizzazione di video live performance.\r\n\r\nDal 2002 al 2005 insegna allo IED in qualità di docente nell’ambito del Master in Web Design e Strategy, e nel 2006 insegna “Flash” nel Corso di Grafica triennale. \r\n\r\nHa inoltre curato diversi interventi alla Facoltà di Ingegneria dell\'Università del Sannio, al Dipartimento di Pratiche Linguistiche e Analisi dei Testi dell\'Università di Bari, alla Facoltà di Lettere e Filosofia dell\'Università di Tor Vergata, all\'Università degli Studi di Perugia, alla Biennale dei Giovani Artisti di Athene (2003), al Flash Forward di San Francisco e New York, al Centro Studi di Szentendre (Budapest), al Sonar di Barcellona, al ResFest di Roma, alla Biennale di Valencia, alla Facoltà di Belle Arti di Barcellona, alla Galleria d’Arte Moderna e Contemporanea di Bergamo, alla Galleria d’Arte Moderna di Roma, alla Facoltà di Architettura della Sapienza. \r\n\r\nNel 2004 vince il premio Bardi Web di IBM con il sito del Festival Internazionale di Roma; nello stesso anno inizia a scrivere per Next Exit ed altri magazine nel Web. \r\n\r\nNel 2006 Achille Bonito Oliva gli conferisce l\'A.B.O. D\'argento, un riconoscimento per essersi distinto nell\'ambito della Web Art, come uno dei protagonisti dell\'Arte Contemporanea internazionale.',
            es: '',
            fr: '',
            pl: '',
            ru: '',
            hu: '',
            by: '',
            gr: ''
        },
        websites: [],
        citizenship: 'Italy',
        phonenumbers: [ '0678147301' ],
        facebook:   profile
    };
    DB.users.save(o, {safe:true}, function(err, res) {
        callback(err, o);
    });
}
DB.twitterFind = function(profile, callback){
    console.log(profile);
    DB.users.findOne({"twitter.id":profile.id}, function(err, res){
        if (!res) {
            console.log("NON TROVATO 1 !!!");
            res.redirect('/controlpanel/login/');
        } else {
            console.log("TROVATO 1 !!!");
            callback(err, res);
        }
    });
}

DB.googleFindOrCreate = function(profile, callback){
    DB.users.findOne({"google.id":profile.id}, function(err, res){
        console.log(res);
        if (!res) {
            console.log("NON TROVATO 1 !!!");
            DB.users.findOne({"emails.email":profile.emails[0].value}, function(err, res){
                console.log(res);
                if (!res) {
                    console.log("NON TROVATO 2 !!!");
                    DB.googleCreate(profile, function(err, res) {
                        callback(err, res);
                    });
                } else {
                    console.log("TROVATO 2 !!!");
                    res.google = profile;
                    DB.users.save(res, {safe:true}, function(e, resSave) {
                        console.log("salvato 2 !!!");
                        callback(e, res);
                    });
                }
            });
        } else {
            console.log("TROVATO 1 !!!");
            callback(err, res);
        }
    });
}
DB.googleFind = function(profile, callback){
    DB.users.findOne({"google.id":profile.id}, function(err, res){
        console.log(res);
        if (!res) {
            console.log("NON TROVATO 1 !!!");
            res.redirect('/controlpanel/login/');
        } else {
            console.log("TROVATO 1 !!!");
            callback(err, res);
        }
    });
}

DB.googleCreate = function(profile, callback) {
    var lang = profile._json.locale.split("_")[0];
    for(var a=0;a<profile.emails.length;a++){
        profile.emails[a].email = profile.emails[a].value;
        delete profile.emails[a].value;
        profile.emails[a].public = 0;
        profile.emails[a].valid = 1;
        profile.emails[a].public = a===0 ? 1 :0;
        profile.emails[a].mailinglists = _config.mailinglists;
    }
    var o = {
        name: profile.name.givenName,
        surname: profile.name.familyName,
        display_name: profile.displayName,
        gender: profile.gender == 'male' ? 'M' : profile.gender == 'female' ? 'F' : 'Other',
        is_crew: 0,
        lang: _config.locales.indexOf(lang),
        public: 1,
        //birth_date: "Mon Feb 28 1966 00:00:00 GMT+0100 (CET)",
        creation_date: new Date(),
        emails:profile.emails,
        files: [ { file: '/warehouse/2012/01/romacreativa_10.jpg' } ],
        locations:
            [ { city: 'Roma',
                country: 'Italy',
                lat: 41.8929163,
                lng: 12.482519899999943 } ],
        permalink: Fnc.getPermalink(profile.displayName),
        stats: {
            events: 0,
            performances: 0,
            playlists: 0,
            footage: 0,
            gallery: 0,
            crews: 0
        },
        text: { en: 'Very interested in any kind of avant-garde, costume, music, art and experimentation, it is updated on all sorts of innovation in technology and communications.\r\n\r\nIn 1996 he founded and coordinates the various activities dealing Flyer Communication Srl well as the managerial tasks and strategic development of all applications Flash Flyer.\r\n\r\nIn 1999 he founded Shockart.net that quickly becomes a point of reference for the Web Art and especially for the productions in Shockwave Flash, features exhibitions in Rome, Valencia, San Francisco, New York.\r\n\r\nIn 2001 he created a AV mixer FLxER based on Flash tecnology, that is presented in the most varied occasions, it is used to mix vector graphics, audio, video, text and interactive media, in live performance.\r\n\r\nFrom 2002 to 2005 taught at the IED as teacher in the Master in Web Design and Strategy, and in 2006 taught "Flash" in the course of Graphics for three years.\r\n\r\nHe has also edited several interventions in the Faculty of Engineering, University of Sannio, Department of Linguistic Practices and Text Analysis at the University of Bari, in the Faculty of Humanities, University of Tor Vergata, University of Perugia , at the Biennale of Young Artists of Athens (2003), the Flash Forward in San Francisco and New York, the Center for Studies in Szentendre (Budapest), at Sonar in Barcelona, the RESFEST of Rome, the Biennial of Valencia, the Faculty of Fine Arts in Barcelona at the Galleria d\'Arte Moderna e Contemporanea di Bergamo, the Galleria d\'Arte Moderna in Rome, at the Faculty of Architecture of Wisdom.\r\n\r\nIn 2004 he won the prize Bardi IBM Web award with the site of the Photograpy International Festival of Rome in the same year he started writing for Next Exit magazine and others on the Web.\r\n\r\nIn 2006, Achille Bonito Oliva gives the ABO Silver, an award for having outstanding accomplishments of Web Art, as one of the protagonists of international contemporary art.',
            it: 'Molto interessato ad ogni tipo di avanguardia, costume, musica, arte e sperimentazione, è sempre aggiornato su ogni genere di innovazione nelle tecnologie e nella comunicazione. \r\n\r\nNel 1996 fonda e coordina le diverse attività di Flyer Communication S.r.l occupandosi oltre che dei compiti manageriali e strategici, dello sviluppo di tutte le applicazioni Flash di Flyer. \r\n\r\nNel 1999 fonda Shockart.net che diventa in poco tempo uno dei punti di riferimento per la Web Art ed in particolare per le produzioni realizzate in Shockwave Flash; realizza mostre a Roma, Valencia, San Francisco, New York. \r\n\r\nNel 2001 crea FLxER un mixer video realizzato in Flash, presentato continuamente nelle più diverse occasioni, utilizzato per mixare grafica vettoriale, audio, video, testo e media interattivi, nella realizzazione di video live performance.\r\n\r\nDal 2002 al 2005 insegna allo IED in qualità di docente nell’ambito del Master in Web Design e Strategy, e nel 2006 insegna “Flash” nel Corso di Grafica triennale. \r\n\r\nHa inoltre curato diversi interventi alla Facoltà di Ingegneria dell\'Università del Sannio, al Dipartimento di Pratiche Linguistiche e Analisi dei Testi dell\'Università di Bari, alla Facoltà di Lettere e Filosofia dell\'Università di Tor Vergata, all\'Università degli Studi di Perugia, alla Biennale dei Giovani Artisti di Athene (2003), al Flash Forward di San Francisco e New York, al Centro Studi di Szentendre (Budapest), al Sonar di Barcellona, al ResFest di Roma, alla Biennale di Valencia, alla Facoltà di Belle Arti di Barcellona, alla Galleria d’Arte Moderna e Contemporanea di Bergamo, alla Galleria d’Arte Moderna di Roma, alla Facoltà di Architettura della Sapienza. \r\n\r\nNel 2004 vince il premio Bardi Web di IBM con il sito del Festival Internazionale di Roma; nello stesso anno inizia a scrivere per Next Exit ed altri magazine nel Web. \r\n\r\nNel 2006 Achille Bonito Oliva gli conferisce l\'A.B.O. D\'argento, un riconoscimento per essersi distinto nell\'ambito della Web Art, come uno dei protagonisti dell\'Arte Contemporanea internazionale.',
            es: '',
            fr: '',
            pl: '',
            ru: '',
            hu: '',
            by: '',
            gr: ''
        },
        websites: [],
        citizenship: 'Italy',
        phonenumbers: [ '0678147301' ],
        facebook:   profile
    };
    DB.users.save(o, {safe:true}, function(err, res) {
        callback(err, o);
    });
}
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
		bcrypt.hash(pass, salt,
			function() { // progress
			},
			function(err, hash) {
				callback(hash);
			}
		);
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
						console.dir(": "+conta);
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
                    console.log("subrecord gallery");
                    console.log(subrecord);
                    /*
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
					*/
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
                    console.log("subrecord gallery");
                    console.log(subrecord);
					/*
					var add = true;
∑					for (var a=0;a<subrecord.gallery.length;a++) {
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
					*/
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
						if (subrecord.users[a]._id.equals(id)) subrecord.users[a] = user; 
					}
					if (subrecord.partners) {
						for (var a=0;a<subrecord.partners.length;a++) {
							if (subrecord.partners[a]._id.equals(id)) subrecord.partners[a] = user; 
						}
					}
					if (subrecord.performances) {
						for (var a=0;a<subrecord.performances.length;a++) {
							for (var b=0;b<subrecord.performances[a].length;b++) {
								if (subrecord.performances[a].users[b]._id.equals(id)) subrecord.performances[a].users[b] = user; 
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
						if (subrecord.users[a]._id.equals(id)) subrecord.users[a] = user; 
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
						if (subrecord.users[a]._id.equals(id)) subrecord.users[a] = user; 
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
						if (subrecord.users[a]._id.equals(id)) subrecord.users[a] = user; 
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
						if (subrecord.users[a]._id.equals(id)) subrecord.users[a] = user; 
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
						if (subrecord.users[a]._id.equals(id)) subrecord.users[a] = user; 
					}
					DB.tvshow.save(subrecord, {safe:true}, function(e, success) {
						conta++;
						console.dir("tvshow: "+conta);
						if (conta==subrecords.length) {
							status.tvshow = true;
							var end = true;
							for (sts in status) if (status[sts]==false) end = false;
							if (end) callback(true);
						}
					});
				});
			} else {
				status.tvshow = true;
				var end = true;
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