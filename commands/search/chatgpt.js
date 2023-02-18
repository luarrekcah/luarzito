const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require('openai');
const dbchat = require('../../chatbot.json');
const levenshtein = require('js-levenshtein');

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
		let bestMatch = null;
		let bestMatchDistance = Number.MAX_SAFE_INTEGER;

		await interaction.reply({
			content: 'Pensando...',
			fetchReply: true,
		});

		for (let i = 0; i < dbchat.length; i++) {
			const item = dbchat[i];
			const distance = levenshtein(message.toLowerCase(), item.q.toLowerCase());

			if (distance < bestMatchDistance && distance < 3) {
				bestMatch = item.r;
				bestMatchDistance = distance;
			}
		}

		if (bestMatch) {
			return await interaction.editReply({
				content: bestMatch,
			});
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

		const reply = completion.data.choices[0].text.trim();
		let cleanedReply = reply.replaceAll(
			/(Robot:|Robô:|Bot:|Computer:)/gi,
			'',
		);

		const regex = /^[a-z].*$/m;
		const match = cleanedReply.match(regex);
		if (match) {
			cleanedReply = cleanedReply.replace(match[0], '');
		}

		await interaction.editReply({
			content: cleanedReply,
		});
	},
};
