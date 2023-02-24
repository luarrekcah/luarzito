const { SlashCommandBuilder } = require('@discordjs/builders');
const { updateItem } = require('../../database');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('afk')
		.setDescription('Ative ou desative seu afk')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('ativar')
				.setDescription('Ative seu afk')
				.addStringOption((option) =>
					option.setName('reason').setDescription('Razão do AFK').setRequired(true),
				),
		)
		.addSubcommand((subcommand) =>
			subcommand.setName('desativar').setDescription('Desative seu afk'),
		),
	async execute(interaction) {
		const reason = interaction.options.getString('reason');
		const subcomando = interaction.options.getSubcommand();
		switch (subcomando) {
		case 'ativar':
			updateItem({
				path: `afk/${interaction.user.id}`,
				params: {
					afk: true,
					reason,
				},
			});
			return interaction.reply({
				content: `Seu AFK foi ativo com a razão: ${reason}`,
			});
		case 'desativar':
			updateItem({
				path: `afk/${interaction.user.id}`,
				params: {
					afk: false,
					reason: '',
				},
			});
			return interaction.reply({
				content: 'Seu AFK foi desativado',
			});
		}
	},
};
