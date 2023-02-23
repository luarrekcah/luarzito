const { SlashCommandBuilder } = require('@discordjs/builders');
const { updateItem, getItems } = require('../../database');

const ERROR_MESSAGES = {
	NOT_ENOUGH_MONEY: 'Você não tem dinheiro suficiente.',
	INVALID_AMOUNT: 'Digite um valor válido.',
	SAME_USER: 'Você não pode movimentar dinheiro a si mesmo.',
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pagar')
		.setDescription('Está devendo alguém? Use esse comando!')
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
		const value = interaction.options.getNumber('valor');

		if (isNaN(value) || value <= 0) {
			return interaction.reply({
				content: ERROR_MESSAGES.INVALID_AMOUNT,
			});
		}

		if (dest.user.id === interaction.user.id) {
			return interaction.reply({
				content: ERROR_MESSAGES.SAME_USER,
			});
		}

		const moneyDest = (await getItems({ path: `users/${dest.user.id}/economy` }))?.money || 0;
		const moneyUser = (await getItems({ path: `users/${interaction.user.id}/economy` }))?.money || 0;

		if (moneyUser < value) {
			return interaction.reply({
				content: ERROR_MESSAGES.NOT_ENOUGH_MONEY,
			});
		}

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
			content: `Você enviou L$${value.toFixed(2)} para <@${dest.user.id}>. Saldo atual: L$${(moneyUser - value).toFixed(2)}`,
		});
	},
};
