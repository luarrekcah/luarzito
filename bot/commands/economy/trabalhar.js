const { SlashCommandBuilder } = require('@discordjs/builders');
const works = require('../../../shared/data/works.json');
const { getTime, compareTime, timeLeft } = require('../../../shared/services/moment');
const { getItems, updateItem } = require('../../../shared/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trabalhar')
		.setDescription(
			'Um dos grandes meios de ganhar dinheiro no Luarzito!',
		),
	async execute(interaction) {

		const lastWorkCheck = (await getItems({ path: `users/${interaction.user.id}/economy/lastWork` })) || '2023-01-01T00:01:00+00:00';

		// if (lastWorkCheck) {
		const lastUse = compareTime(lastWorkCheck);
		if (lastUse.asHours() <= 3.0) {
			return interaction.reply({
				content: `Você precisa esperar no mínimo 3 horas para poder trabalhar de novo! Você poderá trabalhar de novo ${timeLeft(lastWorkCheck)} `,
			});
		}
		// }

		const randomWork = works[Math.floor(Math.random() * works.length)];

		const moneyEarned = Math.floor(Math.random() * (120 - 60 + 1)) + 60;

		let actualMoney = await getItems({ path: `users/${interaction.user.id}/economy/money` });

		if (!actualMoney) {
			actualMoney = 1;
		}

		updateItem({
			path: `users/${interaction.user.id}/economy`,
			params: {
				money: actualMoney + moneyEarned,
				lastWork: getTime(),
			},
		});

		return interaction.reply({
			content: `Você ganhou L$${moneyEarned} (Lennies) como ${randomWork}`,
		});
	},
};
