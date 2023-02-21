const { SlashCommandBuilder } = require('@discordjs/builders');
const { updateItem, getItems } = require('../../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pagar')
		.setDescription(
			'Está devendo alguém? Use esse comando!',
		)
		.addUserOption(option =>
			option
				.setName('usuario')
				.setDescription('Selecine para quem você deseja enviar Lennies')
				.setRequired(true),
		)
		.addNumberOption(option =>
			option
				.setName('valor')
				.setDescription('Digite o valor que quer enviar.')
				.setRequired(true),
		),
	async execute(interaction) {
		const dest = interaction.options.getMember('usuario');
		const value = Number(interaction.options.getNumber('valor'));

		const moneyDest = await getItems({ path: `users/${dest.user.id}/economy` });
		const moneyUser = await getItems({ path: `users/${interaction.user.id}/economy` });

		updateItem({
			path: `users/${dest.user.id}/economy`,
			params: {
				money: moneyDest + value,
			},
		});

		updateItem({
			path: `users/${interaction.user.id}/economy`,
			params: {
				money: moneyUser - value,
			},
		});

		return interaction.reply({
			content: `Você enviou L$${value} para <$${dest.user.id}>.`,
		});
	},
};
