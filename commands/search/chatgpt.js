const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require('openai');

const dbchat = require('../../chatbot.json');

require('dotenv').config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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

		await interaction.reply({
			content: 'Pensando...',
			fetchReply: true,
		});

		for (let i = 0; i < dbchat.length; i++) {
			const item = dbchat[i];
			if (message.toLowerCase().includes(item.q.toLowerCase())) {
				return await interaction.editReply({
					content: item.r,
				});
			}
		}

		const completion = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: message,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0.6,
			stop: [' Human:', ' AI:'],
		});

		await interaction.editReply({
			content: completion.data.choices[0].text
				.trim()
				.replace('Robot:', '')
				.replace('Robô:', '')
				.replace('Bot:', '')
				.replace('Computer:', ''),
		});
	},
};
