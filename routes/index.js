const express = require('express'),
	router = express.Router();

const Prometheus = require('prom-client');

router.get('/', (req, res) => {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`,
	);
	res.send('Go to /api/v1 to see instructions');
});

router.get('/metrics', (req, res) => {
	res.setHeader('Content-Type', Prometheus.register.contentType);
	res.end(JSON.stringify(Prometheus.register.getMetricsAsJSON()));
});


module.exports = router;