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
		try {
			const modelName = 'text-davinci-003';
			const stopSequences = ['Human:', 'Luarzito:'];

			await interaction.reply({
				content: 'Pensando...',
				fetchReply: true,
			});

			const personality =
        'Olá! Meu nome é Luarzito, fui desenvolvido pelo engenheiro de software Raul Rodrigues, no dia 14 de agosto de 2020, como posso lhe ajudar? Hihi.';
			const prompt = `Luarzito: ${personality}\n\nHuman: ${message}`;
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
		}
		catch (error) {
			console.error(error);
			await interaction.reply({
				content:
          'Desculpe, algo deu errado. Por favor, tente novamente mais tarde.',
				ephemeral: true,
			});
		}
	},
};
