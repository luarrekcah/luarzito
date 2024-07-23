const { EmbedBuilder, Collection } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const { client } = interaction;
		const { cooldowns } = client;

		if (!cooldowns.has(interaction.commandName)) {
			cooldowns.set(interaction.commandName, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(interaction.commandName);
		const defaultCooldownDuration = 10;
		const cooldownAmount =
      (interaction.cooldown ?? defaultCooldownDuration) * 1_000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1_000);
				return interaction.reply({
					content: `Por favor aguarde o tempo mínimo de interação para \`${interaction.commandName}\`. Você pode usa-lo de novo em <t:${expiredTimestamp}:R>.`,
					ephemeral: true,
				});
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		if (process.env.NODE_ENV !== 'production' && interaction.user.id !== client.config.botConfig.devId) {
			return interaction.reply({
				content: 'Oi! Eu sei que é um pouco chato mas estou em manutenção agora.',
				ephemeral: true,
			});
		}

		if (interaction.isButton()) {
			console.log(interaction);
		}
		else {
			console.log(
				`${interaction.user.tag} em #${interaction.channel.name}: ${interaction.commandName}`,
			);

			const opts = interaction.options.data.map((option) => option.value);

			const logChannel = client.channels.cache.get(
				client.config.logsChannel.slashLogId,
			);

			if (!logChannel) {
				return console.error(
					`Log channel not found: ${client.config.logsChannel.slashLogId}`,
				);
			}

			const fields = [
				{
					name: 'Autor:',
					value: `<@${interaction.user.id}> - (\`${interaction.user.id}\`)`,
					inline: false,
				},
				{
					name: 'Comando:',
					value: `${interaction.commandName} ${opts.join(' ')}`,
					inline: false,
				},
				{
					name: 'Id da mensagem/comando:',
					value: `${interaction.id}`,
					inline: false,
				},
				{
					name: 'Canal:',
					value: `${interaction.channel.name} - (${interaction.channel.id})`,
					inline: false,
				},
				{
					name: 'Servidor:',
					value: `${interaction.guild.name} - (${interaction.guild.id})`,
					inline: false,
				},
			];
			const embed = new EmbedBuilder()
				.setColor(client.config.botConfig.themeColor)
				.setThumbnail(
					interaction.guild.iconURL({
						dynamic: true,
						size: 2048,
					}),
				)
				.setTitle('Luarzito - Logs')
				.setDescription('Log de Comandos')
				.addFields(fields);

			logChannel.send({ embeds: [embed] }).catch((error) => {
				console.error(`Error sending interaction log: ${error}`);
			});

			if (!interaction.isCommand()) return;

			const command = client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				return command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				interaction.reply({
					content: 'Caaaalma! Deu um erro aqui.',
					ephemeral: true,
				});
			}
		}
	},
};
