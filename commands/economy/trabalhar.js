const { SlashCommandBuilder } = require('@discordjs/builders');
const { updateItem, getItems } = require('../../database');
const works = require('../../data/works.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trabalhar')
		.setDescription(
			'Um dos grandes meios de ganhar dinheiro no Luarzito!',
		),
	async execute(interaction) {

		const randomWork = works[Math.floor(Math.random() * works.length)];

		const moneyEarned = Math.floor(Math.random() * (120 - 60 + 1)) + 60;

		let actualMoney = (await getItems({ path: `users/${interaction.user.id}/economy/money` })) || 0;

		actualMoney = Number(actualMoney);

		updateItem({
			path: `users/${interaction.user.id}/economy`,
			params: {
				money: actualMoney + moneyEarned,
			},
		});

		return interaction.reply({
			content: `Você ganhou ${moneyEarned} como ${randomWork}`,
		});
	},
};
