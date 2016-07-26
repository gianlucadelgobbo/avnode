var DB = require('../../modules/db-manager');
var ObjectID = require('mongodb').ObjectID;
var EM = require('../../modules/email-dispatcher');
var MCapi = require('mailchimp-api');

exports.post = function get(req, res) {
  if (req.session.passport.user == null) {
    res.send({error:__('Error')});
  } else {
    var pathArray = req.url.split('/');
    if (pathArray[0] == '') pathArray.shift();
    if (pathArray[pathArray.length - 1] == '') pathArray.pop();
    if (pathArray[pathArray.length - 1].indexOf('output') != -1) pathArray.pop();
    if (pathArray.length > 0) {
      // CHECK PERMALINK
      if (pathArray[2] == 'checkPermalink') {
        var msg = {
          'users': {
            'ok': __('Profile url is valid'),
            'no': __('Profile url already in use')
          },
          'events': {
            'ok': __('Event url is valid'),
            'no': __('Event url already in use')
          }
        };
        if (req.body.permalink && req.body.collection) {
          var regex = new RegExp(['^', req.body.permalink, '$'].join(''), 'i');
          var q = {permalink: regex};
          if (req.body._id) q._id = {$ne: new ObjectID(req.body._id)};
          DB[req.body.collection].findOne(q, function (e, o) {
            var result = o ? {success: false, msg: msg[req.body.collection].no} : {success: true, msg: msg[req.body.collection].ok};
            res.send(result);
          });
        } else {
          res.sendStatus(404);
        }
      // DELETE TEMP
      } else if (pathArray[2] == 'deleteTemp') {
        if (req.body.id) {
          DB.temp.remove({'_id': new ObjectID(req.body.id)}, {safe: true}, function (err, result) {
            res.send({n: result});
          });
        } else {
          res.sendStatus(404);
        }
      // EVENT PARTNER
      } else if (pathArray[2] == 'searchPartners') {
        if (req.body.search) {
          DB.users.find({'display_name': new RegExp(req.body.search, 'i'), 'is_crew': 1}, {fields: {_id: 1, old_id: 1, display_name: 1, permalink: 1, files: 1, stats: 1, emails: 1}}).toArray(function (e, o) {
            res.send(o);
          });
        } else {
          res.sendStatus(404);
        }
      } else if (pathArray[2] == 'updatePartners') {
        if (req.body.partners && req.body.collection) {
          DB[req.body.collection].findOne({'_id': new ObjectID(req.body._id)}, function (e, o) {
            o.partners = req.body.partners;
            DB[req.body.collection].save(o, {safe: true}, function () {
              res.send(o);
            });
          });
        } else {
          res.sendStatus(404);
        }
      } else if (pathArray[2] == 'deletePartner') {
        if (req.body._id && req.body.id_partner) {
          DB.users.findOne({'_id': new ObjectID(req.body.id_partner)}, function (e, o) {
            if (o.partnerships && o.partnerships.length) {
              o.partnerships = o.partnerships.filter(function (element) {
                return (element._id.toString() !== req.body._id);
              });
              DB.users.save(o, {safe: true}, function () {
                res.send(o);
              });
            } else {
              DB.events.find({'partners._id': new ObjectID(req.body.id_partner)}, {fields: {_id: 1, title: 1, permalink: 1, users: 1, files: 1, categories: 1, stats: 1, date_time_venue: 1}}).toArray(function (e, subrecords) {
              //if (o.partnership) delete o.partnership;
                if (subrecords) o.partnerships = subrecords;
                DB.users.save(o, {safe: true}, function () {
                  res.send(o);
                });
              });
            }
          });
        } else {
          res.sendStatus(404);
        }
      } else if (pathArray[2] == 'invitePartner') {
        if (req.body.data && req.body.collection) {
          DB.saltAndHash(req.body._id + req.body.data._id, function (hash) {
            req.body.code = hash;
            req.body.act = 'invitePartner';
            req.body.collection = 'users';
            req.body.redirect = '/' + req.body.permalink + '/';
            req.body.msg = {title: __('Accept invitation to be partner of') + ': ' + req.body.title, text: __('Invitation accepted with success, please continue')};
            DB.temp.insert(req.body, {safe: true}, function () {
              var text = _config.siteurl + '/confirm/?code=' + req.body.code;
              EM.sendMail({
                text: text,
                //to:    req.body.data.emails[0].email,
                to: 'g.delgobbo@flyer.it',
                subject: _config.sitename + ' | ' + __('Invitation to') + ': ' + req.body.crew_name
              }, function (err) {
                var result = err ? {success: false, msg: __('Email verification sending failed')} : {success: true, msg: __('Email verification sent by email')};
                res.send(result);
              });
            });
          });
        } else {
          res.sendStatus(404);
        }
                /*    } else if (pathArray[2] == "recreatePartnersEvent") {
                 if(req.body.id) {
                 DB.events.findOne({_id:new ObjectID(req.body.id)}, {fields:{_id:1,title:1,permalink:1,users:1,files:1,categories:1,stats:1,date_time_venue:1,partners:1}}, function(e, event) {
                 console.dir({_id:new ObjectID(req.body.id)});
                 console.dir(event);
                 if (event.partners) {
                 var minievent = {_id:event._id,title:event.title,permalink:event.permalink,users:event.users,files:event.files,categories:event.categories,stats:event.stats,date_time_venue:event.date_time_venue};
                 //delete minievent.partners;
                 var conta = 0;
                 event.partners.forEach(function(item){
                 DB.users.findOne({"_id":new ObjectID(item._id)}, function(err, subrecord){
                 if (!subrecord.partnership) subrecord.partnership = [];
                 var add = true;
                 for(event2 in subrecord.partnership) {
                 if (subrecord.partnership[event2]._id==minievent._id) add = false;
                 }
                 if (add) subrecord.partnership.push(minievent);
                 console.log(subrecord);
                 DB.users.save(subrecord, {safe:true}, function(e, success) {
                 conta++;
                 if (event.partners.length==conta) {
                 res.send({success:success});
                 }
                 });
                 });
                 });
                 } else {
                 res.send({success:false});
                 }
                 });
                 } else {
                 res.sendStatus(404);
                 }
                 */
// CREW MEMBERS
      } else if (pathArray[2] == 'searchMembers') {
        if (req.body.search) {
          DB.users.find({'display_name': new RegExp(req.body.search, 'i'), 'is_crew': 0}, {fields: {_id: 1, old_id: 1, display_name: 1, permalink: 1, files: 1, stats: 1, emails: 1}}).toArray(function (e, o) {
            res.send(o);
          });
        } else {
          res.sendStatus(404);
        }
      } else if (pathArray[2] == 'updateMembers') {
        if (req.body.members && req.body.collection) {
          DB[req.body.collection].findOne({'_id': new ObjectID(req.body._id)}, function (e, o) {
            o.members = req.body.members;
            DB[req.body.collection].save(o, {safe: true}, function () {
              res.send(o);
            });
          });
        } else {
          res.sendStatus(404);
        }
      } else if (pathArray[2] == 'inviteMember') {
        if (req.body.data) {
          DB.saltAndHash(req.body._id + req.body.data._id, function (hash) {
            req.body.code = hash;
            req.body.act = 'inviteMember';
            req.body.collection = 'users';
            req.body.redirect = '/' + req.body.permalink + '/';
            req.body.msg = {title: __('Accept invitation to') + ': ' + req.body.crew_name, text: __('Invitation accepted with success, please continue')};
            DB.temp.insert(req.body, {safe: true}, function () {
              var text = 'Ciao '+req.body.data.display_name+',\n'+req.session.passport.user.display_name+' invited you to be member of ' + req.body.crew_name+' ' + _config.siteurl+'/'+req.body.permalink+'\n\nTo accept the invitation click here:\n'+_config.siteurl + '/confirm/?code=' + req.body.code+'\n\n'+_config.signature;
              EM.sendMail({
                text: text,
                //to:    req.body.data.emails[0].email,
                to: 'g.delgobbo@flyer.it',
                subject: _config.sitename + ' | ' + __('Invitation to') + ': ' + req.body.crew_name
              }, function (err) {
                var result = err ? {success: false, msg: __('Email verification sending failed')} : {success: true, msg: __('Email verification sent by email')};
                res.send(result);
              });
            });
            /*
             */
          });
        } else {
          res.sendStatus(404);
        }
      } else if (pathArray[2] == 'recreateUserCrews') {
        if (req.body.id) {
          DB.users.findOne({_id: new ObjectID(req.body.id)}, function (e, user) {
            DB.users.find({'members._id': new ObjectID(req.body.id)}, {fields: {_id: 1, old_id: 1, display_name: 1, permalink: 1, files: 1, stats: 1}}).toArray(function (err, subrecords) {
              if (subrecords.length) user.crews = subrecords;
              DB.users.save(user, {safe: true}, function (e, success) {
                res.send({success: success});
              });
            });
          });
        } else {
          res.sendStatus(404);
        }
    // EMAILS
      } else if (pathArray[2] == 'deleteEmail') {
        if (req.body.email && req.body.collection) {
          DB[req.body.collection].find({'emails.email': req.body.email}).toArray(function (e, results) {
            if (results) {
              results.forEach(function (result, index, theArray) {
                for (var a = result.emails.length - 1; a >= 0; a--) {
                  if (result.emails[a].email == req.body.email && result.emails[a].primary != 1) result.emails.splice(a, a);
                }
                if (index == theArray.length - 1) {
                  DB[req.body.collection].save(result, {safe: true}, function () {
                    res.send({success: true, msg: __('Email deleted')});
                  });
                }
              });
            } else {
              res.sendStatus(404);
            }
          });
        } else {
          res.sendStatus(404);
        }
      } else if (pathArray[2] == 'setPrimary') {
        if (req.body.email && req.body.collection && req.body.doc_id) {
          DB[req.body.collection].find({'emails.email': req.body.email, '_id': new ObjectID(req.body.doc_id)}).toArray(function (e, results) {
            if (results) {
              results.forEach(function (result, index, theArray) {
                var newMails = [];
                for (var a = 0; a < result.emails.length; a++) {
                  if (result.emails[a].email == req.body.email) {
                    result.emails[a].primary = 1;
                    newMails.push(result.emails[a]);
                  } else {
                    result.emails[a].primary = 0;
                  }
                }
                result.emails.forEach(function(email) {
                  if (email !== req.body.email) {
                    newMails.push(email);
                  }
                });
                result.emails = newMails;
                if (index == theArray.length - 1) {
                  DB[req.body.collection].save(result, {safe: true}, function () {
                    res.send({success: true, msg: __('Email is primary')});
                  });
                }
              });
            } else {
              res.sendStatus(404);
            }
          });
        } else {
          res.sendStatus(404);
        }
      } else if (pathArray[2] == 'setNewsletter') {
        if (req.body.email && req.body.newsletters && req.body.doc_id) {
          var MC = new MCapi.Mailchimp('8191ccab84d5abb506af957b912d1674-us7', true);
          //MC.lists.memberInfo({id:'6be13adfd8', emails:[{email:result.emails[index].email}]}, function (data) {
          MC.lists.memberInfo({id: '6be13adfd8', emails: [
            {email: 'g.delgobbo@flyer.it'}
          ]}, function () {
            req.body.newsletters.pop();
            var mcReq = {
              id: '6be13adfd8',
              'update_existing': true,
              'replace_interests': true,
              'email': { email: 'g.delgobbo@flyer.it' },
              'merge_vars': {
                EMAIL: 'g.delgobbo@flyer.it',
                FNAME: 'Triuzla',
                LNAME: 'Green',
                'GROUPINGS': [
                  {'name': 'Topics', id: '2161', 'groups': req.body.newsletters}
                ]
              }
            };
            MC.lists.subscribe(mcReq, function (data) {
              res.send(data);
            }, function (error) {
              res.send(error);
            });
          });
                      /*
                       var CS = new createsend('a1df774dbf1832f1e4177589d54ef8eb');
                       CS.subscriberDetails("ec6de6ef7a4a0cf81d73e0263d8017f2", req.body.email, function (e,o) {
                       console.dir("bella");
                       console.dir(o);
                       var add = 1;
                       for(var a=o.CustomFields.length-1;a>=0;a--){
                       console.dir(a+" "+o.CustomFields[a].Key);
                       if (o.CustomFields[a].Key=="topic" || o.CustomFields[a].Key=="flxer_id" || o.CustomFields[a].Key=="lang") o.CustomFields.splice(a,a);
                       }
                       console.dir(o);
                       var topics = req.body.newsletters.split(",");
                       for(item in topics) {
                       if (topics[item]) o.CustomFields.push({"Key": "topic","Value":topics[item]});
                       }
                       o.CustomFields.push({"Key": "flxer_id","Value":req.body.doc_id});
                       o.CustomFields.push({"Key": "lang","Value":req.body.lang.toUpperCase()});
                       console.dir(o);
                       CS.subscriberUpdate("ec6de6ef7a4a0cf81d73e0263d8017f2", req.body.email, o, function (e,o) {
                       res.send(o);
                       });
                       });
                       */
        } else {
          res.sendStatus(404);
        }
      } else if (pathArray[2] == 'sendVerificationEmail') {
        if (req.body.email && req.body.collection) {
          DB[req.body.collection].findOne({'emails.email': req.body.email}, function (e, o) {
            if (o) {
              res.send({success: false, msg: __('Email already in use')});
            } else {
              DB[req.body.collection].findOne({'_id': new ObjectID(req.body.doc_id)}, function (e, o) {
                o.emails.push({email: req.body.email, valid: 0, public: 0, primary: 0});
                DB[req.body.collection].save(o, {safe: true}, function () {
                  DB.saltAndHash(req.body.email, function (hash) {
                    req.body.code = hash;
                    req.body.act = 'newmail';
                    req.body.data = {email: req.body.email};
                    delete req.body.email;
                    req.body.redirect = '/controlpanel/user/emails/';
                    req.body.msg = {title: __('Email verification'), text: __('Email verified with success, please continue')};
                    DB.temp.insert(req.body, {safe: true}, function () {
                      var text = _config.siteurl + '/confirm/?code=' + req.body.code;
                      EM.sendMail({
                        text: text,
                        to: req.body.data.email,
                        subject: _config.sitename + ' | ' + __('Email verification')
                      }, function (err) {
                        var result = err ? {success: false, msg: __('Email verification sending failed')} : {success: true, msg: __('Email verification sent by email')};
                        res.send(result);
                      });
                    });
                    /*
                     */
                  });
                });
              });
            }
          });
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  }
};
