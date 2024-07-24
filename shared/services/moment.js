const moment = require('moment');
moment.locale('pt-br');
module.exports = {
	getTime: () => {
		return moment().format();
	},
	compareTime: (time) => {
		const now = moment(new Date());
		const date = moment(time);
		const duration = moment.duration(now.diff(date));
		return duration;
	},
	timeLeft: (time) => {
		const lastInteractionTime = new Date(time);
		const nextInteractionTime = new Date(lastInteractionTime.getTime() + 3 * 60 * 60 * 1000);
		const timeInSeconds = Math.floor(nextInteractionTime.getTime() / 1000);

		return `<t:${timeInSeconds}:R>`;
	},
};