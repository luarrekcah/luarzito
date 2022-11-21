const { SlashCommandBuilder } = require('@discordjs/builders'),
	config = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newinvite')
		.setDescription('Gera um convite de um canal!')
		.addStringOption(option =>
			option.setName('channel')
				.setDescription('Id do canal')
				.setRequired(true)),
	async execute(interaction) {
		const { client } = interaction,
			channel = interaction.options.getString('channel');
		if (interaction.user.id != config.botConfig.devId) {
			return interaction.reply({
				content: 'Ei, bobinhx! Este comando é apenas para o desenvolvedor.',
				ephemeral: true,
			});
		}

		await interaction.reply({
			content:
        '<a:alerta:758339902386733098> | Aguarde, estou coletando minhas informações, pode demorar um pouco...',
			fetchReply: true,
		});
		const ch = client.channels.cache.get(channel);
		await ch
			.createInvite({ unique: true })
			.then(invite => {
				return interaction.followUp({
					content: 'https://discord.gg/' + invite.code,
					ephemeral: true,
				});
			})
			.catch(console.log);
	},
};