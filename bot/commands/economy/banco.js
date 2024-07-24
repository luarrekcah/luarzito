const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banco')
		.setDescription('Veja seu saldo!'),
	async execute(interaction) {
		const money = await getItems({
			path: `users/${interaction.user.id}/economy/money`,
		});

		return interaction.reply({
			content: `Você tem L$${Number(money || 0)} no banco.`,
		});
	},
};
