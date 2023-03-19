const express = require('express'),
	router = express.Router();

router.get('/', (req, res) => {
	res.send('api/v1/anime/:format/:search');
});

router.get('/anime/:format/:search', (req, res) => {
	const gif = fetch(`https://kawaii.red/api/${req.params.format}/${req.params.search}/token=anonymous/`).then(
		(response) => {
			return response.json();
		},
	);

	res.json(gif);
});


module.exports = router;