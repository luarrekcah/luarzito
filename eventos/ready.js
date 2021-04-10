module.exports = async bot => {
  console.log(
    "Estou pronto para ser usado \n  Ativo em " +
      bot.channels.cache.size +
      " canais (geral) e " +
      bot.guilds.cache.size +
      " servidores"
  );

  const DBL = require("dblapi.js");
  const dbl = new DBL(process.env.topggTOKEN, bot);

  setInterval(() => {
    dbl.postStats(
      bot.guilds.cache.size //, bot.shards.Id, bot.shards.total
    );
  }, 1800000);

  const channel = await bot.channels.cache.get("792377178834337882");

  const channel_Privado = await bot.channels.cache.get("757308101182357518");

  const aviso =
    "<a:alerta:758339902386733098> | Sistema reiniciado com sucesso";

  channel.send(aviso);
  channel_Privado.send(aviso);

  const avatares = [
    /*Tema normal*/ "https://cdn.discordapp.com/attachments/778691566168440854/799290254309195797/38b8da7ae2bac109e0cd9521916cf79c.png"
    /*Tema natal*/ // "https://cdn.discordapp.com/attachments/742068003583295623/785218721987166228/SPOILER_luarzito_natal.png"
  ];

  const status = [
    "online"
    // "dnd",
    // "idle"
  ];

  const atividades = [
    ["vocês <3", "LISTENING"],
    ["avatar feito no PitzMaker❤", "WATCHING"],
    [bot.users.cache.size + " usuários", "LISTENING"],
    [`me mencione para ver o prefíxo`, "PLAYING"],
    [bot.channels.cache.size + " canais!", "WATCHING"],
    [bot.guilds.cache.size + " servidores!", "WATCHING"]
  ];
  setInterval(async () => {
    // controlar o intervalo
    let i = Math.floor(Math.random() * atividades.length + 1) - 1;
    await bot.user.setActivity(atividades[i][0], { type: atividades[i][1] });
  }, 10000); // intervalo

  setInterval(async () => {
    let b = Math.floor(Math.random() * status.length + 1) - 1;
    await bot.user.setStatus(status[b]);
  }, 20000);

  setInterval(async () => {
    let c = Math.floor(Math.random() * avatares.length + 1) - 1;
    await bot.user.setAvatar(avatares[c]);
  }, 400000);
};
