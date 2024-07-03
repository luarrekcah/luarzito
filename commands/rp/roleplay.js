/* eslint-disable no-case-declarations */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');
const { incrementFriendshipPoints } = require('../../services/roleplay');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roleplay')
		.setDescription('Faça um RP único no Discord!')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('cafune')
				.setDescription('Faça cafuné em alguém!')
				.addUserOption((option) =>
					option
						.setName('usuario')
						.setDescription('Selecine quem você deseja fazer roleplay.')
						.setRequired(true),
				),
		),
	async execute(interaction) {
		const user = interaction.options.getMember('usuario');

		if (user.user.id === interaction.user.id) {
			return interaction.reply({
				content: 'Você não pode interagir com si mesmo.',
			});
		}

		if (user.user.bot) {
			return interaction.reply({
				content: 'Você não pode interagir com um bot.',
			});
		}

		const friendshipID = Number(user.user.id) + Number(interaction.user.id);
		const pointsTotal = await incrementFriendshipPoints(friendshipID);

		const subcomando = interaction.options.getSubcommand();

		switch (subcomando) {
		case 'cafune':
			const gif = await fetch(
				'https://api.otakugifs.xyz/gif?reaction=pat',
			).then((response) => {
				return response.json();
			});

			const embed = new EmbedBuilder()
				.setColor(config.botConfig.themeColor)
				.setTitle(':sparkling_heart: Owwwn cafunézinho :sparkling_heart:')
				.setImage(gif.url)
				.setFooter({
					text: `Pontos de amizade: ${Number(pointsTotal)}`,
				});

			interaction.reply({
				content: `<@${interaction.user.id}> fez cafuné em <@${user.user.id}>`,
				embeds: [embed],
			});
			break;
		default:
			interaction.reply({
				content: 'Ocorreu um erro.',
			});
			break;
		}
	},
};
