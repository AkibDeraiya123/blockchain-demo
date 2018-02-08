const express = require('express');
const router = express.Router();
bcypher = require('blockcypher');
const bcapi = new bcypher('btc','main','c5875043667140f08e5478747927a78e');

router.get('/', (req, res, next) => {
	res.render('index')	
})

router.get('/create', (req, res, next) => {
	res.render('createWallet')	
})

router.post('/create', (req, res, next) => {
	console.log("req.body.name", req.body.name);
	bcapi.genAddr({}, function(err, data) {
		if (err) {
			res.render('showDetail', {
				err: "Something Went Wrong Please try again"
			})
		} else {
			console.log("data.address", data.address);

			bcapi.createWallet(
				{
					"name": req.body.name, 
					"addresses": data.address
				}, function(error, walletRes){
				console.log("walletRes");
				if (error) {
					res.render('showDetail', {
						err: "Something Went Wrong Please try again"
					})
				} else {
					res.render('showDetail', {
						data: data,
						name: req.body.name
					})
				}
			})
		}
	})
})

router.get('/listWallet', (req, res, next) => {
	res.render('listWallet')	
})

module.exports = router;