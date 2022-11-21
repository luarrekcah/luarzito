const express = require('express'),
	app = express(),
	path = require('path');

app.get('/', function(req, res) {
	res.sendStatus(200);
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`,
	);
});

require(__dirname + '/bot.js')(app);
require(__dirname + '/database/init.js');

path.resolve();

const listener = app.listen(process.env.PORT || 3000, function() {
	console.log(`Porta: ${listener.address().port}`);
});

module.exports = app;