var User = require('../models/user');

exports.getClients = function getClients(req, res) {
	if (req.user === undefined) {
    res.redirect('/?from='+req.url);
	} else {
		var term = req.query.term;
		if (term === null) {
			res.status(500).send('missing term parameter');
		}
		var query = {
			name: {
				$regex: term,
				$options: 'i'
			}
		};
		User.find(query, function(error, user) {
			if (error !== null) {
				return res.status(500).send(e.message);
			}

			return res.send(user);
		});
  }
};

/*
exports.getPayments = function getPayments(req, res) {
  if (req.session.passport.user == null) {
    res.redirect('/?from='+req.url);
  } else {
    var query = {payment:{$regex: req.query.term, $options: 'i' }};
    console.dir(query);
    DB.invoices.distinct("payment", query, function(e, result) {
      console.dir(result);
      res.send(result);
    });
  }
};

exports.getInvoices = function getInvoices(req, res) {
  var d = req.query.invoice_date.split("/");
  var q = {invoice_date:{$gt:  new Date(parseInt(d[2], 10),parseInt(d[1], 10)-1,parseInt(d[0], 10))},invoice_number:(req.query.invoice_number-1).toString() };
  console.dir(q);
  DB.invoices.find(q).toArray(function(e, result) {
    console.dir(result);
    res.send({result:result});
  });
};

exports.getProducts = function getProducts(req, res) {
  if (req.session.passport.user == null) {
    res.redirect('/?from='+req.url);
  } else {
    var query = {"items.description":{$regex: req.query.term, $options: 'i' }};
    console.dir(query);
    DB.invoices.distinct("items.description", query, function(e, result) {
      console.dir(result);
      res.send(result);
    });
  }
};
*/
