var DB = require('../../modules/db-manager');
var Fnc = require('../../modules/general-functions');
var ObjectID = require('mongodb').ObjectID;
var CT = require('../../modules/country-list');
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
        res.render('forms/'+_config.sections[sez].view_list, {locals: {title:_config.sections[sez].title, sez:sez, tot:tot, path:conf.path, sort:conf.sort, filter:conf.filter, skip:conf.skip, result:records, Fnc:Fnc}, user : req.session.passport.user});
      });
    } else {
      var p = Fnc.parseParams(req.params[0]);
      var params2 = p.params2;
      var msg = [];
      DB.canIeditThis('performances', {'permalink':params2[0]}, req.session.passport.user, function (result) {
        if (result) {
          var sez = 'performances';
          var subsez = '';
          if (params2.length==1) {
            subsez = 'maindata';
            res.render('forms/performance_maindata', {locals: {title:result.title+': '+__('Main data'), sez:sez, subsez:subsez, countries: CT, result:result, msg:msg,Fnc:Fnc}, user : req.session.passport.user });
          } else if (params2[1]=='mainimage') {
            subsez = 'mainimage';
            res.render('forms/performance_mainimage', {locals: {title:result.title+': '+__('Main image'), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.passport.user });
          } else if (params2[1]=='partners') {
            subsez = 'partners';
            res.render('forms/performance_partners', {locals: {title:result.title+': '+__('Partners'), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.passport.user });
          } else if (params2[1]=='performances') {
            subsez = 'performances';
            res.render('forms/performance_performances', {locals: {title:result.title+': '+__('Performances'), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.passport.user });
          } else if (params2[1]=='gallery') {
            subsez = 'gallery';
            res.render('forms/performance_gallery', {locals: {title:result.title+': '+__('Gallery'), sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.passport.user });
          } else if (params2[1]=='settings') {
            subsez = 'settings';
            res.render('forms/performance_settings', {locals: {title:result.title+': '+__('Settings'), countries: CT, sez:sez, subsez:subsez, result:result, msg:msg,Fnc:Fnc}, user : req.session.passport.user });
          }
        } else {
          res.render('forms/cannotedit', {locals: {}, user : req.session.passport.user });
        }
      });
    }
  }
};
exports.post = function post(req, res) {
  delete req.body.meridian;
  delete req.body.hour;
  delete req.body.minute;
  //ins(req.body); // WTF?!
  var sez = 'performances';
  var subsez = 'settings';
  var msg = [];
  res.render('forms/performance_settings', {locals: {title:req.body.title+': '+__('Settings'), countries: CT, sez:sez, subsez:subsez, result:req.body, msg:msg,Fnc:Fnc}, user : req.session.passport.user });
};
