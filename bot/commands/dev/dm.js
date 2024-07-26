const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  isDev: true,
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("Desenvolvedor apenas")
    .addStringOption((option) =>
      option.setName("id").setDescription("Id do usuário").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("mensagem")
        .setDescription("Mensagem para o usuário")
        .setRequired(true)
    ),
  execute(interaction) {
    const { client } = interaction,
      id = interaction.options.getString("id"),
      message = interaction.options.getString("mensagem");
    const { config } = client;

    if (interaction.user.id != config.botConfig.devId) {
      return interaction.reply({
        content: "Ei, bobinhx! Este comando é apenas para o desenvolvedor.",
        ephemeral: true,
      });
    }

    client.users.send(
      id,
      `Mensagem do desenvolvedor @RaulRodrigues#9258 - (701953428510736396):\n\n${message}`
    );

    return interaction.reply({
      content: "Mensagem enviada.",
      ephemeral: true,
    });

    /*
		return interaction.reply({
			content: 'Ocorreu um erro.',
			ephemeral: true,
		});*/
  },
};
