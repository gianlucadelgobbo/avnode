var media = require('./media');
var date = require('./date');
var text = require('./text');
var mail = require('./mail');

module.exports = {
  media: media,
  date: date,
  text: text,
  mail: mail,
  groupPartnersByType: function(partners) {
    var groupedPartners = {};
    partners.forEach(function(partner) {
      if (groupedPartners[partner.partner_type] === undefined) {
        groupedPartners[partner.partner_type] = [];
      }
      groupedPartners[partner.partner_type].push(partner);
    });
    return groupedPartners;
  },
  groupCategories: function(performances, anc) {
    var groupedCategories = {};
    performances.forEach(function(performance) {
      performance.categories.forEach(function(category) {
        if (category.ancestors[0].permalink.indexOf(anc) !== -1) {
          groupedCategories[category.permalink] = category;
        }
      });
    });
    return groupedCategories;
  },
  groupPerformancesByDayAndRoom: function(events) {
    var groupedPerformances = {};
    events.forEach(function(event) {
      if (groupedPerformances[event.event_data.day] === undefined) {
        groupedPerformances[event.event_data.day] = {};
      }
      if (event.event_data.room !== null) {
        if (groupedPerformances[event.event_data.day][event.event_data.room] === undefined) {
          groupedPerformances[event.event_data.day][event.event_data.room] = [];
        }
        groupedPerformances[event.event_data.day][event.event_data.room].push(event);
      }
    });
    return groupedPerformances;
  },

  groupPerformancesByRoom: function(events) {
    var groupedRooms = {};
    events.forEach(function(event) {
      if (groupedRooms[event.event_data.room] === undefined) {
        groupedRooms[event.event_data.room] = [];
      }
      if (event.event_data.room !== null) {
        //groupedRooms[event.event_data.room].push(event);
      }
    });
    return groupedRooms;
  },

  groupPerformancesBycat: function(events) {
    var groupedCat= {};
    events.forEach(function(event) {
      if (groupedCat[event.event_data.categories.permalink] === undefined) {
        groupedCat[event.event_data.categories.permalink] = [];
      }
      if (event.event_data.categories.permalink !== null) {
        //groupedRooms[event.event_data.room].push(event);
      }
    });
    return groupedCat;
  },


  pagination: function(link, skip, limit, total) {
    var pages = [];
    var total = Math.floor(total / limit);
    var current = Math.floor(skip / limit);

    // add prev link if not on first page
    if (current !== 0) {
      pages.push({index: '<<', link: link + 1, active: false});
      pages.push({index: '<', link: link + current, active: false});
    }

    // go five items back and forth
    // TODO could be improved in the future
    for (var i = (current - 5); i <= (current + 5); i++) {
      if (i >= 0 && i <= total) {
        if (i === current) {
          active = true;
        } else {
          active = false;
        }
        pages.push({index: (i + 1), link: link + (i + 1), active: active});
      }
    }

    // add next link if not on first page
    if (current !== total) {
      pages.push({index: '>', link: link + (current + 2), active: false});
      pages.push({index: '>>', link: link + (total + 1), active: false});
    }
    return pages;
  }
}
