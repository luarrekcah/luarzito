const { getItems, updateItem } = require('../database');

const incrementFriendshipPoints = async (friendshipID) => {
	const randomPoints = Math.floor(Math.random() * (260 - 60 + 1)) + 60;

	const pointsDb =
    (await getItems({ path: `friendship/${friendshipID}/points` })) || 1;

	updateItem({
		path: `friendship/${friendshipID}`,
		params: {
			points: randomPoints + Number(pointsDb),
		},
	});

	return Number(randomPoints) + Number(pointsDb);
};

module.exports = {
	incrementFriendshipPoints,
};
