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
  groupPerformancesByCategories: function(program, anc) {
    var groupedCategories = {};
    program.forEach(function(slot) {
      slot.performance.categories.forEach(function(category) {
        if (category.ancestors && category.ancestors.length && category.ancestors[0].permalink.indexOf(anc) !== -1) {
          if (groupedCategories[category.permalink] === undefined) {
            groupedCategories[category.permalink] = {category:category,list:[]};
          }
          groupedCategories[category.permalink].list.push(slot);
        }

      });
    });
    return groupedCategories;
  },
  groupPerformancesByDayVenueRoom: function(program) {
    var groupedPerformances = {
      venues: [],
      dates: [],
      rooms: [],
      list: {},
      tobeconfirmed: []
    }
    program.forEach(function(slot) {
      var status;
      for (var category=0;category<slot.schedule.categories.length;category++){
        if(slot.schedule.categories[category].ancestors && slot.schedule.categories[category].ancestors.length && slot.schedule.categories[category].ancestors[0].permalink == "status") {
          status = slot.schedule.categories[category].permalink;
        }
      }
      var day = slot.schedule.day;

      //console.log(status);
      if (!status) {
        groupedPerformances.tobeconfirmed.push(slot);
      } else {
        if (slot.schedule.day !== null && slot.schedule.venue.name !== null && slot.schedule.room !== null) {
          if (groupedPerformances.list[slot.schedule.day] === undefined) {
            groupedPerformances.list[slot.schedule.day] = {};
          }
          if (groupedPerformances.dates.indexOf(slot.schedule.day) === -1) {
            groupedPerformances.dates.push(slot.schedule.day);
          }

          if (groupedPerformances.list[slot.schedule.day][slot.schedule.venue.name] === undefined) {
            groupedPerformances.list[slot.schedule.day][slot.schedule.venue.name] = {};
          }
          if (groupedPerformances.venues.indexOf(slot.schedule.venue.name) === -1) {
            groupedPerformances.venues.push(slot.schedule.venue.name);
          }


          if (groupedPerformances.list[slot.schedule.day][slot.schedule.venue.name][slot.schedule.room] === undefined) {
            groupedPerformances.list[slot.schedule.day][slot.schedule.venue.name][slot.schedule.room] = [];
          }
          if (groupedPerformances.rooms.indexOf(slot.schedule.room) === -1) {
            groupedPerformances.rooms.push(slot.schedule.room);
          }
          groupedPerformances.list[slot.schedule.day][slot.schedule.venue.name][slot.schedule.room].push(slot);
        } else {
          console.log("ERROR ERROR ERROR ERROR ERROR ERROR ");

        }

      }/**/
    });
    return groupedPerformances;
  },

  groupArtists: function(program) {
    var groupedArtists = {};
    groupedArtists.stats = {
      n:0,
      people:0,
      countries:[],
      types:{}
    };
    groupedArtists.list = [];
    var groupedArtistsList = {};
    program.forEach(function(slot) {
      slot.performance.users.forEach(function(user) {
        if (groupedArtistsList[user.permalink] === undefined) {
          groupedArtistsList[user.permalink] = user;
          slot.performance.categories.forEach(function(category) {
            if (category.ancestors && category.ancestors.length && category.ancestors[0].permalink.indexOf("type") !== -1) {
              if (groupedArtists.stats.types[category.permalink] === undefined) {
                groupedArtists.stats.types[category.permalink] = {n:1,name:category.name};
              } else {
                groupedArtists.stats.types[category.permalink].n++;
              }
            }
          });
          user.locations.forEach(function(location) {
            if (groupedArtists.stats.countries.indexOf(location.country) == -1) groupedArtists.stats.countries.push(location.country);
          });
          groupedArtists.stats.n += parseFloat(user.stats && user.stats.members != 0 ? user.stats.members : 1)
          groupedArtists.stats.people++
        }
      });
    });
    for(var aa in groupedArtistsList) groupedArtists.list.push(groupedArtistsList[aa]);
    groupedArtists.list.sort(function(a,b) {
      if ( a.display_name < b.display_name )
        return -1;
      if ( a.display_name > b.display_name )
        return 1;
      return 0;
    });
    return groupedArtists;
  },

  groupLocations: function(locations){
    var groupedLocations = {};
    locations.forEach(function(location) {
      if (!groupedLocations[location.country]) groupedLocations[location.country] = [];
      if (groupedLocations[location.country].indexOf(location.city) == -1) groupedLocations[location.country].push(location.city);
    });
    return groupedLocations;
  },

  groupPerformanceCategories: function(categories){
    var groupedCategories = {
      type:{},
      genre:{},
      technique:{}
    };
    categories.forEach(function(category) {
      if (category.ancestors[0].permalink == "type") {
        groupedCategories.type = category;
        categories.forEach(function(category2) {
          if (category2.ancestors[0].permalink == category.permalink+"-technique") {
            groupedCategories.technique = category2;
          }
        });
      }
      if (category.ancestors[0].permalink == "genere") groupedCategories.genre = category;
    });
    return groupedCategories;
  },
/*
  groupPerformancesByRoom: function(performances) {
    var groupedRooms = {};
    performances.forEach(function(performance) {
      if (groupedRooms[performance.event_data.room] === undefined) {
        groupedRooms[performance.event_data.room] = [];
      }
      if (performance.event_data.room !== null) {
        groupedRooms[performance.event_data.room].push(performance);
      }
    });
    return groupedRooms;
  },

  groupPerformancesBycat: function(performances) {
    var groupedCat= {};
    performances.forEach(function(performance) {
      if (groupedCat[performance.event_data.categories.permalink] === undefined) {
        groupedCat[performance.event_data.categories.permalink] = [];
      }
      if (performance.event_data.categories.permalink !== null) {
        //groupedRooms[performance.event_data.room].push(performance);
      }
    });
    return groupedCat;
  },
*/

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
};
