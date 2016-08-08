var User = require('../../models/user');
var Tvshows = require('../../models/tvshow');
var Event = require('../../models/event');
var _ = require('lodash');
var config = require('getconfig');
var Joi = require('joi');
var moment = require('moment');
var _h = require('../../helper/index');

exports.categoriesSchemaGet = {
  event: Joi.string().regex(new RegExp(config.regex.permalink)).required()
};
exports.categoriesGet = function(req, res) {
  var query = { 'permalink': req.params.event };
  Event.findOne(query)
  .exec(function(err, event) {
    res.render('controlpanel/superadmin/public', {
      config: config,
      result: event
    });
  });
};
exports.categoriesSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required(),
  title: Joi.string().required(),
  permalink: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
  subtitle: Joi.object().allow(config.locales),
  text: Joi.object().allow(config.locales),
  websites: Joi.array().items(
    Joi.string().uri()
  ),
  venues: Joi.array().items(
    Joi.object().keys({
      venue: Joi.string().alphanum().required(),
      date: Joi.date().format('YYYY-MM-DD'),
      start_time: Joi.date().format('H:i'),
      end_time: Joi.date().format('H:i'),
      street: Joi.string().allow(''),
      streetnumber: Joi.string().allow(''),
      zip: Joi.string().allow(''),
      city: Joi.string().allow(''),
      country: Joi.string().allow('')
    })
  )
};
exports.categoriesPost = function(req, res) {
  var data = _.defaults(req.body, {
    websites: [],
    venues: []
  });
  Event.findByIdAndUpdate(req.body._id, { $set: data }, { new: true }, function (err, event) {
    res.render('controlpanel/superadmin/public', {
      config: config,
      result: event
    });
  });
};

exports.vjtelevisionSchemaGet = {
  //event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
};
exports.vjtelevisionGet = function(req, res) {
  var today = new Date();
  var month = today.getMonth();
  var year = today.getFullYear();
  var start = new Date(year, month, 1);
  var end = new Date(month==11 ? year+1 : year, month==11 ? 0 : month+1, 1);

  start = year+'-'+(month+1)+'-1';
  end = (month==11 ? year+1 : year)+'-'+(month==11 ? 1 : month+2)+'-1';

  var query = { 'palinsestodate': {$gte: start, $lt: end} };
  console.log('start');
  console.log(start);
  console.log('end');
  console.log(end);
  console.log('query');
  console.log(query);
  Tvshows.find(query)
  .exec(function(err, tvshows) {
    //console.log(tvshows[0]);
    res.render('controlpanel/superadmin/vjtelevision', {
      config: config,
      result: req.user,
      tvshows: tvshows
    });
  });
};
exports.vjtelevisionSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required()
};
exports.vjtelevisionPost = function(req, res) {
  console.log(req.body);
  var startDate = moment([req.body.year, req.body.month - 1]);
  var endDate = moment(startDate).endOf('month');
  //var query = { 'files.duration': {$gt: 0} };
  var query = { 'files.duration': { $exists: true, $ne: 0 }, 'users':{$size: 1} };
  Tvshows.find(query)
    .exec(function(err, tvshows) {
      //console.log(tvshows);
      var TVprogramming = generateTVprogramming(tvshows,startDate,endDate);
      // FIXIT SAVE TVprogramming.update
      res.render('controlpanel/superadmin/vjtelevision', {
        config: config,
        result: req.user,
        update: TVprogramming.update,
        str: TVprogramming.str
      });
    });
};


exports.organizationsSchemaGet = {
  //event: Joi.string().regex(new RegExp(config.regex.permalink)).required(),
};
exports.organizationsGet = function(req, res) {
  res.render('controlpanel/superadmin/organizations', {
    config: config,
    result: req.user
  });
};
exports.organizationsSchemaPost = {
  _id: Joi.string().alphanum().min(24).max(24).required()
};
exports.organizationsPost = function(req, res) {
  if (req.body.move) {
    var query = { 'permalink': req.body.move };
    console.log('MOVE');
    console.log(req.body);
    User.find(query)
      .exec(function(err, crew) {
        var data = crew[0];
        data.is_organization = 1;
        console.log(crew[0]._id);
        //console.log(crew[0]);
        User.findByIdAndUpdate(crew[0]._id, { $set: data }, { new: true }, function (err, crew) {
          res.render('controlpanel/superadmin/organizations', {
            config: config,
            result: req.user,
            crew: crew[0],
            updated: true
          });
        });
      });
  } else if (req.body.crew) {
    User.find({ 'permalink': req.body.crew })
      .exec(function(err, crew) {
        res.render('controlpanel/superadmin/organizations', {
          config: config,
          result: req.user,
          crew: crew[0]
        });
      });
  }
};

var generateTVprogramming = function (sres,startdate,enddate){
  console.log(sres[0]);
  var str='';
  var _SERVER_NAME = 'dev.vjtelevision.com';
  var currentdate = new Date(startdate);
  var dayNum = moment(enddate).diff(startdate, 'days')+1;
  var DOCS = [];
  var VJSETS = [];
  var PERFORMANCES = [];
  var VIDEO = [];
  var DOCS_time = 0;
  var VJSETS_time = 0;
  var PERFORMANCES_time = 0;
  var VIDEO_time = 0;
  var contaVJSETS = 0;
  var contaDOCS = 0;
  var contaVIDEO = 0;
  var contaPERFORMANCES = 0;
  var dailyTime = 0;
  var update = {};
  str+=__('Genero 1 mese a partire da')+': '+moment(startdate).format('YYYY-MM-DD')+__(' fino a ')+moment(enddate).format('YYYY-MM-DD')+'<br />';
  if(sres){
    var index = '<?xml version="1.0" encoding="UTF-8"?>\n';
    index+= '<playlists minDate="1-1-2012" maxDate="'+moment(enddate).format('YYYY-MM-DD')+'" page_url="http://'+_SERVER_NAME+'">\n';
    index+= '<lib m="DOCS" val="http://'+_SERVER_NAME+'/playlists/?id=588" />\n';
    index+= '<lib m="VJ-DJ SETS" val="http://'+_SERVER_NAME+'/playlists/?id=589" />\n';
    index+= '<lib m="PERFORMANCES" val="http://'+_SERVER_NAME+'/playlists/?id=590" />\n';
    index+= '<lib m="VIDEO" val="http://'+_SERVER_NAME+'/playlists/?id=591" />\n';
    index+= '</playlists>';

    console.log(index);
    str+=('Genero Index.xml: <a href="http://'+_SERVER_NAME+'/playlists/index.xml" target="_blank">index</a><br />');

    str+=('Genero maxDate.js: <a href="http://'+_SERVER_NAME+'/_script/maxDate.js" target="_blank">index</a><br />');
    str+=('FILES: '+sres.length)+'<br />\n';
    //for(var cnt in sres){
    for(var i=0;i<sres.length;i++) {
      var cnt = sres[i];
      var catIndex = [];
      for(var ii=0;ii<cnt.categories.length;ii++) catIndex.push(cnt.categories[ii].name);
      if(cnt.files.length && cnt.files[0].duration && cnt.users.length){
        console.log(cnt.files[0].duration);
        if (catIndex.indexOf('DOCS')!==-1) { //588 DOCS
          DOCS.push(cnt);
          DOCS_time = DOCS_time+(cnt.files[0].duration);
        }
        if (catIndex.indexOf('VJ-DJ SETS')!==-1) { //589 VJ-DJ SETS
          VJSETS.push(cnt);
          VJSETS_time = VJSETS_time+(cnt.files[0].duration);
        }
        if (catIndex.indexOf('PERFORMANCES')!==-1) { //590 PERFORMANCES
          PERFORMANCES.push(cnt);
          PERFORMANCES_time = PERFORMANCES_time+(cnt.files[0].duration);
        }
        if (catIndex.indexOf('VIDEO')!==-1) { //591 VIDEO
          VIDEO.push(cnt);
          VIDEO_time = VIDEO_time+(cnt.files[0].duration);
        }
        console.log('FINE'+dayNum);
      }
    }
  }
  str+=('DOCS: '+DOCS.length+' '+moment(DOCS_time).format('HH:mm:ss')+'<br />\n');
  str+=('VJSETS: '+VJSETS.length+' '+moment(VJSETS_time).format('HH:mm:ss')+'<br />\n');
  str+=('PERFORMANCES: '+PERFORMANCES.length+' '+moment(PERFORMANCES_time).format('HH:mm:ss')+'<br />\n');
  str+=('VIDEO: '+VIDEO.length+' '+moment(VIDEO_time).format('HH:mm:ss')+'<hr />\n');
  for(var aa=0;aa<dayNum;aa++) {
    dailyTime = 0;
    str+=('<strong>'+moment(currentdate).format('YYYY-MM-DD')+'</strong><br />');
    if(VJSETS.length) {
      while(dailyTime<6*60*60*1000) {
        var catIndex = [];
        for (var a=0; a<VJSETS[contaVJSETS].categories.length;a++) catIndex.push(VJSETS[contaVJSETS].categories[a].name);
        var ddd = (moment(currentdate).format('YYYY-MM-DD')+' '+_h.date.millisToTime(dailyTime));
        if (!update[VJSETS[contaVJSETS].permalink]) update[VJSETS[contaVJSETS].permalink] = [];
        update[VJSETS[contaVJSETS].permalink].push(ddd);
        str+=(ddd+' '+moment(ddd).format('YYYY-MM-DD HH:mm:ss')+' | duration: '+_h.date.millisToTime(VJSETS[contaVJSETS].files[0].duration)+' | ' +catIndex.join('-')+' | '+VJSETS[contaVJSETS].title+' | <a target="_blank" href="/'+VJSETS[contaVJSETS].users[0].permalink+'/tvshows/'+VJSETS[contaVJSETS]['permalink']+'/">FLxER</a> - <a target="_blank" href="/controlpanel/?edit=tvshows&tvshowid='+VJSETS[contaVJSETS]['id']+'">FLxER CP</a><br />');
        dailyTime+=VJSETS[contaVJSETS].files[0].duration;
        contaVJSETS++;
        if (contaVJSETS>VJSETS.length-1) {
          contaVJSETS = 0;
          str+=('RICOMINCIO VJSETS<br />\n');
        }
      }
    }
    // dalle 6 alle 12
    if(DOCS.length) {
      while(dailyTime<12*60*60*1000) {
        catIndex = [];
        for (var a=0; a<DOCS[contaDOCS].categories.length;a++) catIndex.push(DOCS[contaDOCS].categories[a].name);
        ddd = (moment(currentdate).format('YYYY-MM-DD')+' '+_h.date.millisToTime(dailyTime));
        if (!update[DOCS[contaDOCS].permalink]) update[DOCS[contaDOCS].permalink] = [];
        update[DOCS[contaDOCS].permalink].push(ddd);
        str+=(ddd+' '+moment(ddd).format('YYYY-MM-DD HH:mm:ss')+' | duration: '+_h.date.millisToTime(DOCS[contaDOCS].files[0].duration)+' | ' +catIndex.join('-')+' | '+DOCS[contaDOCS].title+' | <a target="_blank" href="/'+DOCS[contaDOCS].users[0].permalink+'/tvshows/'+DOCS[contaDOCS]['permalink']+'/">FLxER</a> - <a target="_blank" href="/controlpanel/?edit=tvshows&tvshowid='+DOCS[contaDOCS]['id']+'">FLxER CP</a><br />');
        dailyTime+=DOCS[contaDOCS].files[0].duration;
        contaDOCS++;
        if (contaDOCS>DOCS.length-1) {
          contaDOCS = 0;
          str+=('RICOMINCIO DOCS<br />\n');
        }
      }
    }
    // dalle 12 alle 18
    if(VIDEO.length) {
      while(dailyTime<18*60*60*1000) {
        var catIndex = [];
        for (var a=0; a<VIDEO[contaVIDEO].categories.length;a++) catIndex.push(VIDEO[contaVIDEO].categories[a].name);
        var ddd = (moment(currentdate).format('YYYY-MM-DD')+' '+_h.date.millisToTime(dailyTime));
        if (!update[VIDEO[contaVIDEO].permalink]) update[VIDEO[contaVIDEO].permalink] = [];
        update[VIDEO[contaVIDEO].permalink].push(ddd);
        str+=(ddd+' '+moment(ddd).format('YYYY-MM-DD HH:mm:ss')+' | duration: '+_h.date.millisToTime(VIDEO[contaVIDEO].files[0].duration)+' | '+catIndex.join('-')+' | '+VIDEO[contaVIDEO].title+' '+VIDEO[contaVIDEO].title+' | <a target="_blank" href="/'+VIDEO[contaVIDEO].users[0].permalink+'/tvshows/'+VIDEO[contaVIDEO]['permalink']+'/">FLxER</a> - <a target="_blank" href="/controlpanel/?edit=tvshows&tvshowid='+VIDEO[contaVIDEO]['id']+'">FLxER CP</a><br />');
        dailyTime+=VIDEO[contaVIDEO].files[0].duration;
        contaVIDEO++;
        if (contaVIDEO>VIDEO.length-1) {
          contaVIDEO = 0;
          str+=('RICOMINCIO VIDEO<br />\n');
        }
      }
    }
    // dalle 18 alle 24
    if(PERFORMANCES.length) {
      while(dailyTime<24*60*60*1000) {
        var catIndex = [];
        for (var a=0; a<PERFORMANCES[contaPERFORMANCES].categories.length;a++) catIndex.push(PERFORMANCES[contaPERFORMANCES].categories[a].name);
        var ddd = (moment(currentdate).format('YYYY-MM-DD')+' '+_h.date.millisToTime(dailyTime));
        if (!update[PERFORMANCES[contaPERFORMANCES].permalink]) update[PERFORMANCES[contaPERFORMANCES].permalink] = [];
        update[PERFORMANCES[contaPERFORMANCES].permalink].push(ddd);
        str+=(ddd+' '+moment(ddd).format('YYYY-MM-DD HH:mm:ss')+' | duration: '+_h.date.millisToTime(PERFORMANCES[contaPERFORMANCES].files[0].duration)+' | '+catIndex.join('-')+' | '+PERFORMANCES[contaPERFORMANCES].title+' | <a target="_blank" href="/'+PERFORMANCES[contaPERFORMANCES].users[0].permalink+'/tvshows/'+PERFORMANCES[contaPERFORMANCES]['permalink']+'/">FLxER</a> - <a target="_blank" href="/controlpanel/?edit=tvshows&tvshowid='+PERFORMANCES[contaPERFORMANCES]['id']+'">FLxER CP</a><br />');
        dailyTime+=PERFORMANCES[contaPERFORMANCES].files[0].duration;
        contaPERFORMANCES++;
        if (contaPERFORMANCES>PERFORMANCES.length-1) {
          contaPERFORMANCES = 0;
          str+=('RICOMINCIO PERFORMANCES<br />\n');
        }
      }
    }
    currentdate.setDate(currentdate.getDate() + 1);
  }
  return {str:str , update:update};
};

