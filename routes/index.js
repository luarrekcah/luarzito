const express = require('express'),
	router = express.Router();

const Prometheus = require('prom-client');


router.get('/', (req, res) => {
	res.sendStatus(200);
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`,
	);
});

router.get('/metrics', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(Prometheus.register.getMetricsAsJSON()));
});


module.exports = router;