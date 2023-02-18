const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('genimg')
		.setDescription('Gere uma imagem com as características que você desejar!')
		.addStringOption((option) =>
			option
				.setName('desc')
				.setDescription('Descreva como você quer a imagem.')
				.setRequired(true),
		),
	async execute(interaction) {
		const prompt = interaction.options.getString('desc');

		await interaction.reply({
			content: 'Isso parece interessante...',
			fetchReply: true,
		});


		const response = await openai.createImage({
			prompt,
			n: 1,
			size: '1024x1024',
		});

		if (response) {
			return await interaction.editReply({
				content: response.data.data[0].url,
			});
		}
		else {
			return await interaction.editReply({
				content: 'Ok... Algo deu errado...',
			});
		}


	},
};
