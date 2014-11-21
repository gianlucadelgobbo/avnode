exports.get = function get(req, res) {
	res.render('forms/login', {title : "Login", "from":req.query.from, user : req.session.passport.user });
}
