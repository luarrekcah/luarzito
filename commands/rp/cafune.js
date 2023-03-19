const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { updateItem, getItems } = require('../../database');
const config = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cafune')
		.setDescription('Faça um cafuné em quem você gosta!')
		.addUserOption((option) =>
			option
				.setName('usuario')
				.setDescription('Selecine quem você deseja fazer cafuné.')
				.setRequired(true),
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

		const randomPoints = Math.floor(Math.random() * (260 - 60 + 1)) + 60;

		const pointsDb =
      (await getItems({ path: `friendship/${friendshipID}/points` })) || 1;

		updateItem({
			path: `friendship/${friendshipID}`,
			params: {
				points: randomPoints + Number(pointsDb),
			},
		});

		const gif = await fetch('https://lzbot.devluar.com/api/v1/anime/gif/pat').then(
			(response) => {
				return response.json();
			},
		);

		const embed = new EmbedBuilder()
			.setColor(config.botConfig.themeColor)
			.setTitle(':sparkling_heart: Owwwn cafunézinho :sparkling_heart:')
			.setImage(gif.response)
			.setFooter({
				text: `Pontos de amizade: ${randomPoints + Number(pointsDb)}`,
			});

		return interaction.reply({ embeds: [embed] });
	},
};
