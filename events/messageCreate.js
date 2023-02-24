const { getItems, updateItem } = require('../database');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;
		if (message.content === '<@743841329334845530>') {
			return message.reply(
				'Olá! Use `/` para usar meus comandos, digite `/ajuda` para mais informações!',
			);
		}

		console.log(message);

		const afkData = await getItems({ path: `afk/${message.author.id}` });
		if (afkData && afkData.afk) {
			updateItem({
				path: `afk/${message.author.id}`,
				params: {
					afk: false,
					reason: '',
				},
			});

			return message.reply('Seu AFK foi desativado devido sua atividade.');
		}

		for (const user of message.mentions.users.cache.values()) {
			const afkCheck = await getItems({ path: `afk/${user.id}` });
			console.log(user);
			console.log(user.id);
			if (afkCheck && afkCheck.afk) {
				return message.reply(
					`O usuário ${user.tag} está AFK. Razão: ${afkCheck.reason}`,
				);
			}
		}
	},
};
