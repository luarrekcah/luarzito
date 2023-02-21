const { SlashCommandBuilder } = require('@discordjs/builders'),
	config = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('Desenvolvedor apenas')
		.addStringOption(option =>
			option.setName('code')
				.setDescription('Code')
				.setRequired(true)),
	execute(interaction) {
		const code = interaction.options.getString('code');
		if (interaction.user.id != config.botConfig.devId) {
			return interaction.reply({
				content: 'Ei, bobinhx! Este comando é apenas para o desenvolvedor.',
				ephemeral: true,
			});
		}
		let result;
		try {
			result = eval(code);
		}
		catch (error) {
			return interaction.reply({
				content: `erro: ${error}`,
				ephemeral: true,
			});
		}
		return interaction.reply({
			content: `${result}`,
			ephemeral: true,
		});
	},
};
