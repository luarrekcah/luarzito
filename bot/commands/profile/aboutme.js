const { SlashCommandBuilder } = require('@discordjs/builders');
const { updateItem } = require('../../../shared/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sobremim')
		.setDescription(
			'Conte um pouco sobre você.',
		)
		.addStringOption(option =>
			option
				.setName('text')
				.setDescription('Seja breve mas explicativo!')
				.setRequired(true),
		),
	execute(interaction) {
		const newAbout = interaction.options.getString('text');

		updateItem({
			path: `users/${interaction.user.id}/profile`,
			params: {
				aboutme: newAbout,
			},
		});

		return interaction.reply({
			content: `Seu 'sobre mim' foi atualizado para: ${newAbout}`,
		});
	},
};
