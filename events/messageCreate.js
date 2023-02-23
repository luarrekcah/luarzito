module.exports = {
	name: 'messageCreate',
	async execute(message,
	) {
		if (message.content.includes('<@$743841329334845530>')) {
			return message.channel.send('Olá! Use `/` para usar meus comandos, digite `/ajuda` para mais informações!');
		}
	},
};
