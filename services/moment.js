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
		const nextInteractionTime = moment(time, 'DD/MM/YYYY HH:mm:ss').add(3, 'hours');
		return `<t:${Math.floor(nextInteractionTime / 1000)}:R>`;
	},
};