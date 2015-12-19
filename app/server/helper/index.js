var media = require('./media');
var date = require('./date');

module.exports = {
  media: media,
  date: date,
  pagination: function(link, skip, limit, total) {
    var pages = [];
    for(var i = 0; i < Math.floor(total / limit); i++) {
      if ((i * limit) === skip) {
        var active = true;
      } else {
        var active = false;
      }
      pages.push({index: (i + 1), link: link + (i + 1), active: active});
    }
    return pages;
  }
}
