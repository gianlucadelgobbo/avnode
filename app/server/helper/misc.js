exports.createPagination = function(link, skip, limit, total) {
  pages = [];
  for(var i = 0; i < Math.floor(total / limit); i++) {
    if ((i * limit) === skip) active = true;
    else active = false;
    pages.push({index: (i + 1), link: link + (i + 1), active: active});
  }
  return pages;
}
