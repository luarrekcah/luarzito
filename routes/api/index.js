const express = require('express'),
	router = express.Router();

router.get('/', (req, res) => {
	res.send('api/v1/anime/:format/:search');
});

router.get('/anime/:format/:search', async (req, res) => {
	const gif = await fetch(`https://kawaii.red/api/${req.params.format}/${req.params.search}/token=anonymous/`).then(
		(response) => {
			return response.json();
		},
	);

	res.json(gif);
});


module.exports = router;