const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require('openai');

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

		const personality = 'AI:Meu nome é Luarzito, fui desenvolvido pelo engenheiro de software Raul Rodrigues, no dia 14 de agosto de 2020, como posso lhe ajudar? Hihi. \n\nHuman:';

		const completion = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: personality + message,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0.6,
			stop: [' Human:', ' AI:'],
		});

		const reply = completion.data.choices[0].text.trim();
		let cleanedReply = reply.replaceAll(/(Robot:|Robô:|Bot:|Computer:)/gi, '');

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
