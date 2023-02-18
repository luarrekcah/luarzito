const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;

const model = 'image-alpha-001';

const url = 'https://api.openai.com/v1/images/generations';

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

		axios
			.post(
				url,
				{
					model: model,
					prompt: prompt,
					num_images: 1,
				},
				{
					headers: {
						Authorization: `Bearer ${apiKey}`,
						'Content-Type': 'application/json',
					},
				},
			)
			.then(async (response) => {
				await interaction.editReply({
					content: response.data.data[0].url,
				});
			})
			.catch(async (error) => {
				await interaction.editReply({
					content: 'Desculpe... Ocorreu um erro.',
				});
				console.error('Erro ao gerar a imagem:', error);
			});
	},
};
