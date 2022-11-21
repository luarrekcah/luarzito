const { SlashCommandBuilder } = require('@discordjs/builders'),
	config = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('Desenvolvedor apenas')
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
		const ch = client.channels.cache.get(channel) || interaction.channel;
		await ch
			.createInvite({ unique: true })
			.then(invite => {
				return interaction.reply({
					content: 'https://discord.gg/' + invite.code,
					ephemeral: true,
				});
			})
			.catch(console.log);
	},
};
