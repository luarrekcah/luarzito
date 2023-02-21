const { SlashCommandBuilder } = require('@discordjs/builders');
const { getItems } = require('../../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banco')
		.setDescription(
			'Veja seu saldo!',
		),
	async execute(interaction) {
		const money = await getItems({ path: `users/${interaction.user.id}/economy/money` });

		return interaction.reply({
			content: `Você tem L$${money} no banco.`,
		});
	},
};
