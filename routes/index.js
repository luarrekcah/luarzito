const express = require('express'),
	router = express.Router();

router.get('/', (req, res) => {
	res.sendStatus(200);
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`,
	);
});


module.exports = router;