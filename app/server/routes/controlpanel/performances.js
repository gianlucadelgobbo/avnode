var DB = require('../../modules/db-manager');
var Fnc = require('../../modules/general-functions');
var ObjectID = require('mongodb').ObjectID;
var CT = require('../../modules/country-list');
var util = require('util');
function ins(value) { console.log(util.inspect(value, false, null)); }
exports.get = function get(req, res) {
  if (req.session.passport.user == null) {
    res.redirect('/controlpanel/login/?from='+req.url);
  } else {
    var sez = 'performances';
    if (req.params.length==0 || req.params[0]=='' || req.params[0]=='/') {
      var ids = [new ObjectID(req.session.passport.user._id)];
      for(var crew in req.session.passport.user.crews) ids.push(new ObjectID(req.session.passport.user.crews[crew]._id));
      //var ids = [req.session.passport.user.permalink];
      //for(var crew in req.session.passport.user.crews) ids.push(req.session.passport.user.crews[crew].permalink);
      Fnc.getList(req.params[0], sez, res, ids, function(err, tot, records, conf){
        res.render('forms/'+_config.sections[sez].view_list, {title:_config.sections[sez].title, sez:sez, tot:tot, path:conf.path, sort:conf.sort, filter:conf.filter, skip:conf.skip, result:records, Fnc:Fnc, user : req.session.passport.user});
      });
    } else {
      var p = Fnc.parseParams(req.params[0]);
      var page = p.page;
      var params2 = p.params2;
      DB.canIeditThis('performances', {'permalink':params2[0]}, req.session.passport.user, function (result) {
        if (result) {
          var sez = 'performances';
          if (params2.length==1) {
            var subsez = 'maindata';
            var msg = [];
            res.render('forms/performance_maindata', {title:result.title+': '+__('Main data'), sez:sez, subsez:subsez, countries: CT, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
          } else if (params2[1]=='mainimage') {
            var subsez = 'mainimage';
            var msg = [];
            res.render('forms/performance_mainimage', {title:result.title+': '+__('Main image'), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
          } else if (params2[1]=='partners') {
            var subsez = 'partners';
            var msg = [];
            res.render('forms/performance_partners', {title:result.title+': '+__('Partners'), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
          } else if (params2[1]=='performances') {
            var subsez = 'performances';
            var msg = [];
            res.render('forms/performance_performances', {title:result.title+': '+__('Performances'), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
          } else if (params2[1]=='gallery') {
            var subsez = 'gallery';
            var msg = [];
            res.render('forms/performance_gallery', {title:result.title+': '+__('Gallery'), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
          } else if (params2[1]=='settings') {
            var subsez = 'settings';
            var msg = [];
            res.render('forms/performance_settings', {title:result.title+': '+__('Settings'), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc, user : req.session.passport.user });
          }
        } else {
          res.render('forms/cannotedit', {user : req.session.passport.user });
        }
      });
    }
  }
};
exports.post = function post(req, res) {
  delete req.body.meridian;
  delete req.body.hour;
  delete req.body.minute;
  ins(req.body);
  var sez = 'performances';
  var subsez = 'settings';
  var msg = [];
  res.render('forms/performance_settings', {title:req.body.title+': '+__('Settings'), countries: CT, sez:sez, subsez:subsez, result:req.body, msg:msg,Fnc:Fnc, user : req.session.passport.user });
};
