exports.get = function get(req, res) {
	res.render('forms/login', {	locals: {title : "Login", "from":req.query.from}, user : req.session.passport.user });
}
