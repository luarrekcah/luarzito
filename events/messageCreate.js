module.exports = {
	name: 'messageCreate',
	async execute(message,
	) {
		if (message.content === '<@743841329334845530>') {
			return message.reply('Olá! Use `/` para usar meus comandos, digite `/ajuda` para mais informações!');
		}
	},
};
