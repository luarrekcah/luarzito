const express = require('express'),
	router = express.Router();

router.get('/', (req, res) => {
	res.json('api/v1/anime/:type');
});


module.exports = router;