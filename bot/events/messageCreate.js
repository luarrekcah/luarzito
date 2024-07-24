const { PermissionsBitField } = require('discord.js');
const { getItems, updateItem } = require('../../shared/database');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;
		if (message.content === '<@743841329334845530>') {
			return message.reply(
				'Olá! Use `/` para usar meus comandos, digite `/ajuda` para mais informações!',
			);
		}

		const afkData = await getItems({ path: `afk/${message.author.id}` });
		if (afkData && afkData.afk) {
			updateItem({
				path: `afk/${message.author.id}`,
				params: {
					afk: false,
					reason: '',
				},
			});

			return message.reply({ content: "Seu AFK foi desativado devido sua atividade.", ephemeral: true });
		}

		message.mentions.users.forEach(async (user) => {
			const afkCheck = await getItems({ path: `afk/${user.id}` });
			if (afkCheck && afkCheck.afk) {
				try {
					const botPermissionsIn = message.guild.members.me.permissionsIn(message.channel);

					if (botPermissionsIn.has(PermissionsBitField.Flags.ManageWebhooks)) {
						const webhook = await message.channel.createWebhook({
							name: user.globalName || user.username,
							avatar: user.displayAvatarURL({ format: 'png' }),
						});

						webhook.send({
							content: afkCheck.reason,
						});

						setTimeout(() => {
							webhook.delete()
						}, 5000)
					} else {
						return message.reply(
							`O usuário ${user.username} está AFK. Razão: ${afkCheck.reason}`,
						);
					}
				} catch (error) {
					console.log(error)
					return;
				}
			}
		});
	},
};
