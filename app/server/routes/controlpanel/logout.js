exports.get = function get(req, res) {
  req.logout();
  res.redirect('/');
};
