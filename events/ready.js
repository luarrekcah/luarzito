const { ActivityType } = require('discord.js'),
	config = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		if (!config.botConfig.development) {
			const channel = await client.channels.cache.get('792377178834337882');

			const channel_Privado = await client.channels.cache.get(
				'757308101182357518',
			);

			const aviso =
        '<a:alerta:758339902386733098> | Sistema reiniciado com sucesso';

			channel.send(aviso);
			channel_Privado.send(aviso);
		}

		const avatares = [
			// config.botConfig.avatarsTheme.default,
			config.botConfig.avatarsTheme.halloween,
		];

		const status = [
			'online',
		];

		const atividades = [
			// [`ATUALIZAÇÃO v3.0`,  ActivityType.Competing],
			// [`Comandos globais disponíveis, tente /ajuda`,  ActivityType.Watching],
			['Entre no meu servidor!', ActivityType.Watching],
			['Obrigado por ainda me utilizar, meu desenvolvedor anda bem ocupado sabe! Mas vai dar tudo certo :)', ActivityType.Watching],
			// [`/ideia funcional`,  ActivityType.Watching],
			// [`Estou caindo muito? Provavelmente estão trabalhando em mim!`,  ActivityType.Watching]
		];

		setInterval(async () => {
			// controlar o intervalo
			const i = Math.floor(Math.random() * atividades.length + 1) - 1;
			await client.user.setActivity(atividades[i][0], {
				type: atividades[i][1],
			});
		}, 10000);
		// intervalo

		setInterval(async () => {
			const b = Math.floor(Math.random() * status.length + 1) - 1;
			await client.user.setStatus(status[b]);
		}, 20000);

		setInterval(async () => {
			const c = Math.floor(Math.random() * avatares.length + 1) - 1;
			await client.user.setAvatar(avatares[c]);
		}, 400000);

		console.log(
			`========= Preparado, logado como: ${client.user.tag} ========= `,
		);
	},
};
