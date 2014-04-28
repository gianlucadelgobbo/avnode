exports.get = function get(req, res) {
    setLocale(req.query.lang);
    var redirect = req.headers.referer ? req.headers.referer : '/';
    res.redirect(redirect);
}
