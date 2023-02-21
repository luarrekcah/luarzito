const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carta')
		.setDescription('Envie uma mensagem a um usuário através do bot!')
		.addStringOption(option =>
			option.setName('id')
				.setDescription('Id do usuário')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('mensagem')
				.setDescription('Mensagem para o usuário')
				.setRequired(true)),
	execute(interaction) {
		const { client } = interaction,
			id = interaction.options.getString('id'),
			message = interaction.options.getString('mensagem');
		const allMessage = `Carta de <@${interaction.author.id}> - (${interaction.author.id}):\n\n${message}`;
		try {
			client.users.send(id, allMessage);
		}
		catch (error) {
			return interaction.reply({
				content: 'Ocorreu um erro.',
				ephemeral: true,
			});
		}
		return interaction.reply({
			content: 'Mensagem enviada.',
			ephemeral: true,
		});
	},
};
