const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	isDev: true,
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Desenvolvedor apenas'),
	execute(interaction) {
		
		const { client } = interaction;
		const { config } = client;

		if (interaction.user.id != config.botConfig.devId) {
			return interaction.reply({
				content: 'Ei, bobinhx! Este comando é apenas para o desenvolvedor.',
				ephemeral: true,
			});
		}
		interaction
			.reply({
				content: 'Certo, estarei reiniciando neste momento.',
				ephemeral: true,
			})
			.then(() => {
				setTimeout(() => {
					process.exit(1);
				}, 5000);
			});
	},
};
