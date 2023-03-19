const express = require('express'),
	app = express(),
	path = require('path'),
	cors = require('cors');

app.use(cors());

require('./routes')(app);

require(__dirname + '/bot.js');
require(__dirname + '/database/init.js');

path.resolve();

const listener = app.listen(process.env.PORT || 3000, function() {
	console.log(`Porta: ${listener.address().port}`);
});

module.exports = app;