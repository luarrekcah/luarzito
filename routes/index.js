const express = require('express'),
	router = express.Router();

router.get('/', (req, res) => {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`,
	);
	res.send('Go to /api/v1 to see instructions');
});

module.exports = router;