const { SlashCommandBuilder } = require("@discordjs/builders"),
  {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js"),
  moment = require("moment");
moment.locale("pt-BR");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Veja informações do servidor e usuário!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Informações de um usuário")
        .addUserOption((option) =>
          option.setName("user").setDescription("menção ou id").setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Informações de um servidor")
        .addStringOption((option) =>
          option.setName("server_id").setDescription("ID do servidor").setRequired(false)
        )
    ),
  async execute(interaction) {
    const { client } = interaction;
    const { config } = client;
    const subcomando = interaction.options.getSubcommand();
    const targetUser = interaction.options.getUser("user") || interaction.user;
    const targetServerId = interaction.options.getString("server_id");
    const guild = targetServerId ? await client.guilds.fetch(targetServerId) : interaction.guild;

    if (!guild) {
      return interaction.reply({
        content: "Servidor não encontrado.",
        ephemeral: true,
      });
    }

    const checkBots = () => guild.members.cache.filter(member => member.user.bot).size;
    const checkMembers = () => guild.members.cache.filter(member => !member.user.bot).size;

    const embedGuild = new EmbedBuilder()
      .setColor(config.botConfig.themeColor)
      .setAuthor({
        name: `${guild.name} - ${guild.id}`,
        iconURL: config.imagesLink.infoEmbed,
      })
      .setThumbnail(
        `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=2048`
      )
      .setImage(
        guild.splash
          ? `https://cdn.discordapp.com/splashes/${guild.id}/${guild.splash}.png?size=2048`
          : null
      )
      .addFields(
        {
          name: "Dono:",
          value: `<@${guild.ownerId}> - ${guild.ownerId}`,
        },
        {
          name: "Quantidade de membros:",
          value: `:person_red_hair: ${checkMembers()} - :robot: ${checkBots()} - Total: ${guild.memberCount}`,
        },
        {
          name: "Quantidade de canais:",
          value: `${guild.channels.cache.size}`,
        },
        {
          name: "Canais Importantes:",
          value: `${
            guild.rulesChannelId ? "<#" + guild.rulesChannelId + ">" : "Sem canal de regras"
          } | ${
            guild.publicUpdatesChannelId ? "<#" + guild.publicUpdatesChannelId + ">" : "Sem canal de novidades"
          }`,
        },
        {
          name: "Nível de Verificação:",
          value: `${guild.verificationLevel}`,
        },
        {
          name: "Região:",
          value: `${guild.preferredLocale || "Não especificada"}`,
        },
        {
          name: "Número de impulsos:",
          value: `${guild.premiumSubscriptionCount}`,
        },
        {
          name: "Recursos:",
          value: guild.features.length > 0 ? guild.features.join(', ') : "Nenhum",
        },
        {
          name: "Criado em:",
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`,
        },
        {
          name: "Entrei aqui em:",
          value: `<t:${Math.floor(guild.joinedTimestamp / 1000)}:R>`,
        }
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Baixar ícone")
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=2048`
        )
    );

    const embedUser = async (user) => {
      let memberData;
      let userData = await client.users.fetch(user.id);

      try {
        memberData = await guild.members.fetch(user.id);
      } catch (error) {
        memberData = null;
      }

      const fields = [
        {
          name: "Criado em:",
          value: `<t:${Math.floor(userData.createdAt / 1000)}:R>`,
        },
        memberData ? {
          name: "Entrou no servidor em:",
          value: `<t:${Math.floor(memberData.joinedTimestamp / 1000)}:R>`,
        } : {
          name: "Entrou no servidor em:",
          value: "Usuário não é membro do servidor.",
        },
        userData.globalName ? {
          name: "Nome Global:",
          value: userData.globalName,
        } : null,
        memberData && memberData.nickname ? {
          name: "Apelido:",
          value: memberData.nickname || "Não definido",
        } : null,
        memberData && memberData.premiumSinceTimestamp ? {
          name: "Booster desde:",
          value: `<t:${Math.floor(memberData.premiumSinceTimestamp / 1000)}:R>`,
        } : null,
        userData.avatar ? {
          name: "Avatar:",
          value: `[Clique aqui](${userData.displayAvatarURL({ format: "png", size: 2048 })})`,
        } : null,
        memberData && memberData.roles.size > 0 ? {
          name: "Cargos:",
          value: memberData.roles.cache.map(role => `<@&${role.id}>`).join(', '),
        } : null,
      ].filter(field => field !== null);

      return new EmbedBuilder()
        .setColor(config.botConfig.themeColor)
        .setAuthor({
          name: `${userData.username}#${userData.discriminator} - (${userData.id})`,
          iconURL: config.imagesLink.infoEmbed,
        })
        .setThumbnail(userData.displayAvatarURL({ format: "png", size: 2048 }))
        .addFields(fields);
    };

    const rowUser = (user) => new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Baixar Avatar")
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`
        )
    );

    switch (subcomando) {
      case "server":
        await interaction.reply({ embeds: [embedGuild], components: [row] });
        break;

      case "user":
        const userEmbed = await embedUser(targetUser);
        await interaction.reply({ embeds: [userEmbed], components: [rowUser(targetUser)] });
        break;
    }
  },
};
