const { SlashCommandBuilder } = require("@discordjs/builders"),
  axios = require("axios"),
  { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Pesquise termos pela Wikipedia!")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("O termo que deseja")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const { config } = client;
    const query = interaction.options.getString("query");
    axios
      .get("https://pt.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          prop: "extracts",
          format: "json",
          titles: query,
          exintro: "",
          explaintext: "",
          redirects: "",
          formatversion: 2,
        },
      })
      .then(async (data) => {
        const body = data.data;
        if (body.query.pages[0].missing) {
          return await interaction.reply({
            content: "Sem resultados.",
            fetchReply: true,
            ephemeral: true,
          });
        }
        const embed = new EmbedBuilder()
          .setTitle("Wiki - " + body.query.pages[0].title)
          .setColor(config.botConfig.themeColor)
          .setDescription(
            body.query.pages[0].extract.substr(0, 2000).replace(/[\n]/g, "\n\n")
          );

        return interaction.reply({ embeds: [embed] });
      });
  },
};
