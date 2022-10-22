const { SlashCommandBuilder } = require('@discordjs/builders'),
	config = require('../../config.json'),
	{ EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js'),
	moment = require('moment');
moment.locale('pt-BR');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Veja informações do servidor e usuário!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Informações de um usuário')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('menção ao usuário')
						.setRequired(true),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('user_id')
				.setDescription('Informações de um usuário')
				.addStringOption(option =>
					option
						.setName('user_id')
						.setDescription('ID de um usuário')
						.setRequired(true),
				),
		)
		.addSubcommand(subcommand =>
			subcommand.setName('server').setDescription('Informações do um servidor'),
		),
	async execute(interaction) {
		/*
    verify
    if (interaction.user.id != config.botConfig.devId)
      return interaction.reply({
        content: "Ei, bobinhx! Este comando é apenas para o desenvolvedor.",
        ephemeral: true
      });
    verify
    */
		const subcomando = interaction.options.getSubcommand();

		const { guild, user } = interaction;

		const checkBots = () => {
				let botCount = 0;
				guild.members.cache.forEach(member => {
					if (member.user.bot) botCount++;
				});
				return botCount;
			}, checkMembers = () => {
				let memberCount = 0;
				guild.members.cache.forEach(member => {
					if (!member.user.bot) memberCount++;
				});
				return memberCount;
			};

		const embedGuild = new EmbedBuilder()
			.setColor(config.botConfig.themeColor)
			.setAuthor({ name: `${guild.name} - ${guild.id}`, iconURL: config.imagesLink.infoEmbed })
			.setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=2048`)
			.setImage(`https://cdn.discordapp.com/splashes/${guild.id}/${guild.splash}.png?size=2048`)
			.addFields(
				{
					name: 'Dono:',
					value: `<@${guild.ownerId}> - ${guild.ownerId}`,
				},
				{
					name: 'Quantidade de membros:',
					value: `:person_red_hair: ${checkMembers(guild)} - :robot: ${checkBots(guild)}`,
				},
				{
					name: 'Quantidade de canais:',
					value: `${guild.channels.cache.size}`,
				},
				{
					name: 'Canais Importantes:',
					value: `${guild.rulesChannelId !== null ? '<#' + guild.rulesChannelId + '>' : 'Sem canal de regras'} | ${guild.publicUpdatesChannelId !== null ? '<#' + guild.publicUpdatesChannelId + '>' : 'Sem canal de novidades'}`,
				},
				{
					name: 'Criado em:',
					value: `${moment.utc(guild.createdAt).format('LLL') + ' - ' + moment.utc(guild.createdAt).fromNow()}`,
				},
				{
					name: 'Entrei aqui em:',
					value: `${moment.utc(guild.joinedTimestamp).format('LLL') + ' - ' + moment.utc(guild.joinedTimestamp).fromNow()}`,
				},
			);

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Baixar ícone')
					.setStyle(ButtonStyle.Link)
					.setURL(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=2048`),
			);

		const embedUser = new EmbedBuilder()
			.setColor(config.botConfig.themeColor)
			.setAuthor({ name: `${user.username}#${user.discriminator} - (${user.id})`, iconURL: config.imagesLink.infoEmbed })
			.setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`)
			.addFields(
				{
					name: 'Criado em:',
					value: `${moment.utc(user.createdAt).format('LLL') + ' - ' + moment.utc(user.createdAt).fromNow()}`,
				},
				{
					name: 'Entrei aqui em:',
					value: `${moment.utc(user.joinedAt).format('LLL') + ' - ' + moment.utc(user.joinedAt).fromNow()}`,
				},
			);

		const rowUser = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Baixar Avatar')
					.setStyle(ButtonStyle.Link)
					.setURL(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`),
			);


		moment.locale(guild.preferredLocale);


		switch (subcomando) {
		case 'server':

			interaction.reply({ embeds: [embedGuild], components: [row] });
			break;

		case 'user':


			interaction.reply({ embeds: [embedUser], components: [rowUser] });
			break;

		case 'user_id':
			interaction.reply({
				content: 'Oláa! Esse subcomando será disponibilizado em breve.',
				ephemeral: true,
			});
			break;
		}
	},
};
