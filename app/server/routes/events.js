var DB = require('../modules/db-manager');
var Fnc = require('../modules/general-functions');
var config = require('getconfig');

exports.get = function get(req, res) {
  var sez = "events";
  Fnc.getList(req.params[0], sez, res, 0, function(err, tot, records, conf){
    var title = config.sections[sez].title,
    info = " From " + conf.skip + " to " + (conf.skip + config.sections[sez].limit) + " on " + tot + " " + title,
    categories = config.sections[sez].categories,
    orderings = config.sections[sez].orders;

    res.render("events/list", {
      config: config,
      basename: '/events',
      title: title,
      categories: categories,
      orderings: orderings,
      info: info,
      sez: sez,
      tot: tot,
      path: conf.path,
      sort: conf.sort,
      filter: conf.filter,
      skip: conf.skip,
      result: records.map(function(item) { return item; }),
      Fnc: Fnc,
      user: req.session.passport.user
    });
  });
};
