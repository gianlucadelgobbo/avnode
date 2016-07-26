var Errors = require('../errors');
var config = require('getconfig');
var User = require('../models/user');
var Footage = require('../models/footage');
var Event = require('../models/event');
var Gallery = require('../models/gallery');
var Performance = require('../models/performance');
var Playlist = require('../models/playlist');
var Tvshow = require('../models/tvshow');
var _ = require('lodash');

var _h = require('../helper/index');

exports.getUser = function get(req, res) {
  var query = { 'permalink': req.params.user };
  console.log('get user', query);
  // FIXME
  User.findOne(query)
  .exec(function(err, user) {
    if (user) {
      // FIXME TBD
      if (user.text !== null && user.text[getLocale()]) {
        user.text = user.text[getLocale()];
      } else {
        user.text = '';
      }
      res.render('user/show', {
        title: user.display_name,
        performer: user,
        user: req.user,
        _h: _h
      });
    }
  });
};

var localsList = function(user, req, sez) {
  return {
    title: config.sections[sez].title + " | " + user.display_name,
    performer: user,
    section: sez,
    user: req.user,
    _h: _h
  }
}

exports.getUserEvents = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/events', localsList(user, req, "events"));
  });
}

exports.getUserPerformances = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/performances', localsList(user, req, "performances"));
  });
}

exports.getUserTvshows = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
    .exec(function(error, user) {
      res.render('user/sections/tvshows', localsList(user, req, "tvshows"));
    });
}

exports.getUserFootages = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
    .exec(function(error, user) {
      res.render('user/sections/footages', localsList(user, req, "footage"));
    });
}

exports.getUserPlaylists = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/playlists', localsList(user, req, "playlists"));
  });
}


exports.getUserGalleries = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/galleries', localsList(user, req, "galleries"));
  });
}

exports.getUserCrews = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User.findOne(query)
  .exec(function(error, user) {
    res.render('user/sections/crews', localsList(user, req, "crews"));
  });
}

var localsDetail = function(user, result, req, sez) {
  return {
    title: result.title + " | " +  config.sections[sez].title + " | " + user.display_name,
    result: result,
    section: sez,
    performer: user,
    user: req.user,
    _h: _h
  }
}

exports.getUserEvent = function get(req, res, next) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    if (error) return next(new Errors.Internal());
    if (!user) return next(new Errors.NotFound('User not found'));
    var query = { 'permalink': req.params.event };
    Event
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/details/event', localsDetail(user, result, req, "events"));
    });
  });
};

exports.getUserPerformance = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.performance };
    Performance
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/details/performance', localsDetail(user, result, req, "performances"));
    });
  });
};

exports.getUserTvshow = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
    .findOne(query)
    .exec(function(error, user) {
      var query = { 'permalink': req.params.tvshow };
      Tvshow
        .findOne(query)
        .exec(function(error, result) {
          res.render('user/details/tvshow', localsDetail(user, result, req, "tvshows"));
        });
    });
};

exports.getUserFootage = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
    .findOne(query)
    .exec(function(error, user) {
      var query = { 'permalink': req.params.footage };
      Footage
        .findOne(query)
        .exec(function(error, result) {
          res.render('user/details/footage', localsDetail(user, result, req, "footage"));
        });
    });
};

exports.getUserPlaylist = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.playlist };
    Playlist
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/details/playlist', localsDetail(user, result, req, "playlists"));
    });
  });
};

exports.getUserGallery = function get(req, res) {
  console.log(req.params);
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.gallery };
    Gallery
    .findOne(query)
    .exec(function(error, result) {
      var ld = localsDetail(user, result, req, "galleries");
      res.render('user/details/gallery', ld);
    });
  });
};

/*
exports.getUserCrew = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.crew };
    User
    .findOne(query)
    .exec(function(error, result) {
      res.render('user/sections/show', localsDetail(user, result, req, "performances"));
    });
  });
};
*/
exports.participateAtUserEvent = function get(req, res) {
  var query = { 'permalink': req.params.user };
  User
  .findOne(query)
  .exec(function(error, user) {
    var query = { 'permalink': req.params.event };
    Event
    .findOne(query)
    .exec(function(error, result) {
      // FIXME
      res.send('FIXME');
    });
  });
}

exports.post = function post(req, res) {
  var pathArray = req.url.split("/");
  var output = (req.query.output ? req.query.output : false);
  if (pathArray[0]=="") pathArray.shift();
  if (pathArray[pathArray.length-1]=="") pathArray.pop();
  if (pathArray[pathArray.length-1].indexOf("output")!=-1) pathArray.pop();
  var passport_user = req.session.passport && req.session.passport.user ? req.session.passport.user : {};
  if (pathArray.length > 0) {
    DB.users.findOne({permalink:pathArray[0]}, function(e, result) {
      if (result) {
        switch (pathArray.length) {
          case 4 :
            if (config.sections[pathArray[1]] && config.sections[pathArray[1]].subsections && config.sections[pathArray[1]].subsections[pathArray[3]]) {
              DB[config.sections[pathArray[1]].coll].findOne({permalink:pathArray[2]}, function(e, dett) {
                console.log("POSTPOSTPOSTPOSTPOST");
                console.log(req.body);
                console.log(req.body.step);
                console.log(typeof req.body.step);
                if (dett && typeof req.body.step!='undefined') {
                  var msg;
                  switch (parseInt(req.body.step)) {
                    case 0 :
                      if (dett && typeof req.body.index!='undefined') {
                        req.session.call.step = parseInt(req.body.step)+1;
                        req.session.call.index = parseInt(req.body.index);
                      } else {
                        msg = {e:[{name:"index",m:__("Please select a call")}]}
                      }
                      break;
                    case 1 :
                      if (dett && req.body.accept=='1') {
                        req.session.call.step = parseInt(req.body.step)+1;
                      } else {
                        msg = {e:[{name:"accept",m:__("Please accept the terms and conditions to go forward")}]}
                      }
                      break;
                    case 2 :
                      if (dett && typeof req.body.performance!='undefined') {
                        req.session.call.step = parseInt(req.body.step)+1;
                        for (var a=0; a<passport_user.performances.length; a++) {
                          if (passport_user.performances[a]._id==req.body.performance){
                            req.session.call.performance = passport_user.performances[a];
                            req.session.call.subscriptions = [];
                            for (var b=0; b<req.session.call.performance.users.length; b++) {
                              if (req.session.call.performance.users[b].members) {
                                for (var c=0; c<req.session.call.performance.users[b].members.length; c++) {
                                  DB.subscriptions.findOne({subscriber_id:req.session.call.performance.users[b].members[c]._id}, function(e, subscription) {
                                    if (subscription) {
                                      req.session.call.subscriptions.push(subscription);
                                    }
                                  });
                                }
                              } else {
                                DB.subscriptions.findOne({subscriber_id:req.session.call.performance.users[b]._id}, function(e, subscription) {
                                  if (subscription) {
                                    req.session.call.subscriptions.push(subscription);
                                  }
                                });

                              }
                            }
                          }
                        }

                      } else {
                        msg = {e:[{name:"accept",m:__("Please select a performance to go forward")}]}
                      }
                      break;
                    case 3 :
                      if (dett && req.body.topics.length) {
                        req.session.call.step = parseInt(req.body.step)+1;
                        req.session.call.topics = req.body.topics;
                      } else {
                        msg = {e:[{name:"accept",m:__("Please select at least 1 topic to go forward")}]}
                      }
                      break;
                    case 4 :
                      if (dett && req.body.subscriptions && req.body.subscriptions.length) {
                        req.session.call.step = parseInt(req.body.step)+1;
                        var subscriptions = [];
                        for (var a=0; a<req.body.subscriptions.length; a++) {
                          if (req.body.subscriptions[a].subscriber_id){
                            var subscriptionA = req.body.subscriptions[a];
                            subscriptions.push(subscriptionA);
                          }
                        }
                        req.session.call.subscriptions = subscriptions;
                      } else {
                        msg = {e:[{name:"accept",m:__("Please select at least 1 person to go forward")}]}
                      }
                      break;
                  }
                  console.log(req.session.call);
                  /*req.session.call = {
                    step: 0,
                    event: {
                      _id : dett._id,
                      permalink: dett.permalink
                    }
                  }*/
                  if (output=="json") {
                    res.send(result);
                  } else if (output=="xml") {
                    res.render('performer_dett_'+pathArray[1]+'_'+pathArray[3]+"_xml", {  layout: false, userpage:true, title: result.display_name+": "+config.sections[pathArray[1]].title, sez:pathArray[1], result : result, dett : dett, Fnc:Fnc, user : passport_user, call: req.session.call, msg:msg  });
                  } else {
                    res.render('performer_dett_'+pathArray[1]+'_'+pathArray[3], {                          userpage:true, title: result.display_name+": "+config.sections[pathArray[1]].title, sez:pathArray[1], result : result, dett : dett, Fnc:Fnc, user : passport_user, call: req.session.call, msg:msg  });
                  }
                } else {
                  res.sendStatus(404);
                }
              });
            } else {
              res.sendStatus(404);
            }
            break;

          default :
            res.sendStatus(404);
        }
      } else {
        res.sendStatus(404);
      }
    });
  } else {
    res.sendStatus(404);
  }
};
