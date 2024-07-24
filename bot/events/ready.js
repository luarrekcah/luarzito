const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		if (process.env.NODE_ENV !== 'production') {
			const channel = await client.channels.cache.get('792377178834337882');

			const channel_Privado = await client.channels.cache.get(
				'757308101182357518',
			);

			const aviso =
        '<a:alerta:758339902386733098> | Sistema reiniciado com sucesso';

			channel.send(aviso);
			channel_Privado.send(aviso);
		}

		const atividades = [
			['Tem alguma ideia? Use o comando /sugestao!', ActivityType.Competing],
			[
				'Heeey, ainda não entrou no meu servidor? Use o comando /ajuda para entrar!',
				ActivityType.Watching,
			],
			['Acesse luarzito.devluar.com', ActivityType.Competing],
			[
				'Obrigado por ainda me utilizar, meu desenvolvedor anda bem ocupado sabe! Mas vai dar tudo certo :)',
				ActivityType.Watching,
			],
		];

		setInterval(async () => {
			const i = Math.floor(Math.random() * atividades.length + 1) - 1;
			await client.user.setActivity(atividades[i][0], {
				type: atividades[i][1],
			});
		}, 10000);

		console.log(
			`========= Preparado, logado como: ${client.user.tag} ========= `,
		);
	},
};
