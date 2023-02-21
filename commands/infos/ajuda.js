const { SlashCommandBuilder } = require('@discordjs/builders'),
	config = require('../../config.json'),
	{ EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ajuda')
		.setDescription('Alguma dúvida sobre mim? Use esse comando!'),
	async execute(interaction) {
		const { client } = interaction;

		const dev = client.users.cache.get(config.botConfig.devId);
		const ano = new Date();
		const embed = new EmbedBuilder()
			.setColor(config.botConfig.themeColor)
			.setAuthor({ name: 'Ajuda - Resumo', iconURL: config.imagesLink.infoEmbed })
			.setImage(config.adsImages[Math.floor(Math.random() * config.adsImages.length + 1) - 1])
			.setDescription(
				'Um bot para moderação, RP valorizado, economia e diversão geral. Legal, né?! Se quiser ver tudo que posso fazer, entre no meu site! :)',
			)
			.setFooter({
				text: `09/08/2020 ~ ${ano.getFullYear()} © ${client.user.username} | ${dev.username} `,
			},
			);

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Adicionar')
					.setStyle(ButtonStyle.Link)
					.setURL(config.links.addBot),
			)
			.addComponents(
				new ButtonBuilder()
					.setLabel('Website')
					.setStyle(ButtonStyle.Link)
					.setURL(config.links.website),
			)
			.addComponents(
				new ButtonBuilder()
					.setLabel('Suporte')
					.setStyle(ButtonStyle.Link)
					.setURL(config.links.supportGuild),
			)
			.addComponents(
				new ButtonBuilder()
					.setLabel('Votar')
					.setStyle(ButtonStyle.Link)
					.setURL(config.links.topGG),
			);
		return interaction.reply({ embeds: [embed], components: [row] });
	},
};
