const express = require('express');
const router = express.Router();
bcypher = require('blockcypher');
const bcapi = new bcypher('btc','main','YOURTOKEN');

router.get('/', (req, res, next) => {
	res.render('index')	
})

router.get('/create', (req, res, next) => {
	res.render('createWallet')	
})

router.post('/create', (req, res, next) => {
	bcapi.genAddr({}, function(err, data) {
		if (err) {
			res.render('showDetail', {
				err: "Something Went Wrong Please try again"
			})
		} else {
			console.log("data.address", data.address);

			bcapi.createWallet( { "name": req.body.name, "addresses": [data.address] }, function(error, walletRes) {
				if (walletRes.error) {
					res.render('showDetail', {
						err: walletRes.error
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
	bcapi.listWallets((err, data) => {
		console.log("data", data);
		if (err === null && data && data.wallet_names.length > 0) {
			res.render('listWallet', {
				data: data.wallet_names
			});
		} else {
			console.log("Something wrong")
		}
	})
})

router.get('/view/:walletName', (req, res, next) => {
	bcapi.getWallet(req.params.walletName, (error, data)=> {
		console.log("error", error);
		console.log("data", data);

		res.render('viewWallet', {
			data: {
				name: data.name,
				addresses: data.addresses
			}
		});
	})
})

router.get('/removeWallet/:add', (req, res, next) => {
	bcapi.delWallet(req.params.add, (error, data)=> {
		console.log("error", error);
		console.log("data", data);

	})
})

module.exports = router;