/* eslint-disable no-unreachable */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require('openai');
const { updateItem, getItems } = require('../../database');

require('dotenv').config();
/*

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chatgpt')
		.setDescription(
			'Apenas perguntas, comando integrado ao ChatGPT-3 da openia.',
		)
		.addStringOption((option) =>
			option
				.setName('mensagem')
				.setDescription('Mensagem para o bot')
				.setRequired(true),
		),
	async execute(interaction) {
		const message = interaction.options.getString('mensagem');

		return await interaction.reply({
			content:
        'Comando temporariamente indisponível. A API consumida pelo Luarzito está com algumas limitações, entre no servidor para ficar por dentro das novidades e saber quando o comando vai ser liberado novamente!',
		});

		const replyMessage = await interaction.reply({
			content:
        'Pensando... <a:alerta:758339902386733098> <a:alerta:758339902386733098> <a:alerta:758339902386733098>',
			fetchReply: true,
		});

		if (message === 'reset') {
			updateItem({
				path: `users/${interaction.user.id}/chatbot`,
				params: {
					text: '',
				},
			});

			return replyMessage.edit({
				content: 'Bot resetado.',
				fetchReply: true,
			});
		}

		try {
			const modelName = 'text-davinci-003';
			const stopSequences = ['Human:', 'Luarzito:'];

			let oldMessages = (await getItems({ path: 'chatbot/text' })) || '';

			if (oldMessages.length > 4000) {
				oldMessages = oldMessages.slice(oldMessages.length - 4000);
			}

			let text = `${oldMessages}\n\nHuman: ${message}`;

			const prompt = message;
			const completion = await openai.createCompletion({
				model: modelName,
				prompt,
				temperature: 0.5,
				max_tokens: 1000,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0.6,
				stop: stopSequences,
			});

			text += ' Luarzito: ' + completion.data.choices[0].text;

			updateItem({
				path: `users/${interaction.user.id}/chatbot`,
				params: {
					text,
				},
			});

			let reply = completion.data.choices[0].text.trim();
			reply = reply.replaceAll(/(Robot:|Robô:|Bot:|Computer:)/gi, '');

			const regex = /^[a-z].*$/m;
			const match = reply.match(regex);
			if (match) {
				reply = reply.replace(match[0], '');
			}

			return replyMessage.edit({
				content: reply,
			});
		}
		catch (error) {
			console.error(error);
			return interaction.reply({
				content:
          'Desculpe, algo deu errado. Por favor, tente novamente mais tarde.',
				ephemeral: true,
			});
		}
	},
};
