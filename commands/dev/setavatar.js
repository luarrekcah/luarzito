const { SlashCommandBuilder } = require('@discordjs/builders'),
	config = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setavatar')
		.setDescription('Desenvolvedor apenas')
		.addStringOption(option =>
			option.setName('avatar')
				.setDescription('Tipos de avatar')
				.setRequired(true)
				.addChoices(
					{ name: 'normal', value: 'normal' },
					{ name: 'manutencao', value: 'manutencao' },
				)),
	async execute(interaction) {
		const opt = interaction.options.getString('avatar');
		const { client } = interaction;
		if (interaction.user.id != config.botConfig.devId) {
			return interaction.reply({
				content: 'Ei, bobinhx! Este comando é apenas para o desenvolvedor.',
				ephemeral: true,
			});
		}

		switch (opt) {
		case 'normal':
			await client.user.setAvatar(config.botConfig.avatarsTheme.default);
			await client.user.setStatus('online');
			interaction.reply({
				content: 'Avatar normal setado.',
				ephemeral: true,
			});
			break;
		case 'manutencao':
			await client.user.setAvatar(config.botConfig.avatarsTheme.manutencao);
			await client.user.setStatus('dnd');
			interaction.reply({
				content: 'Avatar manutenção setado.',
				ephemeral: true,
			});
			break;
		}
	},
};
