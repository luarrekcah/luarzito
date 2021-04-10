const Discord = require("discord.js");

const firebase = require("firebase");
if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}
module.exports = async (bot, message, argumentos) => {
  const channel = bot.channels.cache.get("761993669061902337");

  const database = firebase.database();

  /*
  const guildTag =
    message.channel.type === "text" ? `[${message.guild.name}]` : "[DM]";
  const channelTag =
    message.channel.type === "text" ? `[#${message.channel.name}]` : "";
  channel.send(
    `${guildTag}${channelTag} ${message.author.tag}: ${message.content}`
  );
  */
  let bref = database.ref(`Servidores/${message.guild.id}`);
  bref.once("value").then(async function(db) {
    try {
      if (db.val() === null) {
        // bot.prefixo = "lz.";
        bref.set({
          prefixo: "lz."
        });
        /* } else {
        bot.prefixo = await db.val().prefixo;
      }*/
      } else if (db.val().prefixo == null) {
        bref.set({ prefixo: "lz." });
      }
    } catch (e) {
      console.log(e);
    }

    if (
      !message.content.startsWith(db.val().prefixo) &&
      // !message.content.startsWith(bot.prefixo.toUpperCase()) ||
      !message.content.startsWith("Lz.") && 
      !message.content.startsWith("lz.")
    ) {
      const user = message.mentions.users.first(); //|| message.author;
      if (!user) return;
      if (message.author.bot) return;
      if (user.id === "743841329334845530") {
        if (message.content.length === 22 || message.content.length === 21) {
          return message.channel
            .send(
              `Olá ${message.author}! Eu me chamo ` +
                user.username +
                " e meu prefíxo nesse servidor é " +
                "`" +
                db.val().prefixo +
                "`! Que tal tentar " +
                "`" +
                db.val().prefixo +
                "help`?"
            )
            .then(message.delete({ timeout: 500 }));
        } else {
          return;
        }
      }
      return;
    }

    var arg_texto = message.content.slice(db.val().prefixo.length);
    var argumentos = arg_texto.trim().split(/ +/g);
    var comando = argumentos.shift().toLowerCase();

    var chat = message.channel;
    let remover = comando.length + 1;
    arg_texto = arg_texto.slice(remover);

    var prefixo = db.val().prefixo;
    
    switch (comando) {
      case "help":
      case "comandos":
        comando = "ajuda";
        break;
      case "uptime":
      case "sistema":
      case "tempo ativo":
        comando = "ping";
        break;
      case "work":
        comando = "trabalhar";
        break;
      case "bank":
        comando = "banco";
        break;
      case "falar":
      case "fale":
      case "fala":
        comando = "say";
        break;
      case "abraçar":
        comando = "hug";
        break;
      case "bot":
      case "dev":
      case "desenvolvedor":
      case "infobot":
        comando = "botinfo";
        break;
      case "cartaon":
      case "cartaoff":
        comando = "cartaconfig";
        break;
      case "apertar":
      case "shakehand":
      case "aperto": 
        comando = "handshake";
        break;
      case "lyrics":
      case "rics":
      case "letras":
        comando = "ly";
        break;
      case "beijar":
      case "beijo":
        comando = "kiss";
        break;
      case "criaremoji":
      case "createemoji":
      case "addem":
        comando = "addemoji";
        break;
      case "banir":
      case "bane":
      case "bana":
        comando = "ban";
        break;
      case "channel":
      case "canal":
        comando = "ch";
        break;
      case "cls":
      case "clean":
        comando = "clear";
        break;
      case "gem":
      case "getem":
        comando = "getemoji";
        break;
      case "chute":
      case "chutar":
      case "expulse":
      case "expulsar":
        comando = "kick";
        break;
      case "server":
        comando = "sv";
        break;
      case "ip":
      case "ipget":
        comando = "ipget";
        break;
      case "search":
      case "pesquisar":
      case "img":
      case "im":
      case "i":
      case "s":
        comando = "image";
        break;
      case "metadinha":
        comando = "couple";
        break;
      case "achievement":
      case "achi":
        comando = "conquista";
        break;
      case "flip":
      case "girar":
        comando = "fliptext";
        break;
      case "eminfo":
        comando = "emojiinfo";
        break;
      case "setp":
      case "setarprefixo":
      case "newprefix":
      case "prefix":
        comando = "setprefix";
        break;
      case "weather":
      case "tempo":
        comando = "clima";
        break;
      case "snipe":
        comando = "catch";
        break;
      case "svicon":
      case "guildicon":
      case "serverfoto":
      case "guildfoto":
        comando = "servericon";
        break;
        case "ui":
        case "infouser":
        case "getuser":
        case "iu":
        comando = "userinfo";
        break;
        case "si":
        case "is":
        case "infoserver":
        case "getserver":
        case "serverget":
        case "guildinfo":
        case "infoguild":
        case "gi":
        case "ig":
        comando = "serverinfo";
        break;
    } 

    if (bot.pastas[comando] && bot.pastas[comando].includes("comandos")) {
      if (!message.guild && ![""].includes(comando)) {
        return chat.send(
          `Olá, está perdido? Veja meu site ${bot.webpage} para obter ajuda!`
        );
      }
      let icon = message.guild.iconURL({
        dynamic: true,
        format: "png",
        size: 1024
      });
      let ping = new Date();
      const channel = await bot.channels.cache.get("792377293272121364");
      let embedLog = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(icon)
        .addField(
          "Autor:",
          "<@" + message.author.id + "> - (`" + message.author.id + "`)"
        )
        .addField("Comando:", db.val().prefixo + comando + " " + arg_texto)
        .addField("Id da mensagem/comando:", message.id)
        .addField("Canal:", message.channel.name + ` - (${message.channel.id})`)
        .addField("Servidor:", message.guild.name + ` - (${message.guild.id})`)
        .setFooter(
          `Horário de uso: ${ping.getUTCHours() -
            5}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
        );
      channel.send(embedLog);
      /*
      message.author.tag +
        "  " +
        bot.prefixo +
        comando +
        " " +
        arg_texto +
        " no canal: " +
        message.channel.name +
        " no servidor: " +
        message.guild.name
    */
      bot[comando](bot, message, argumentos, arg_texto, chat, prefixo); //arg_texto: argumento com o prefixo
    } else {
      if(message.content.length <= 2) return;
      message.channel
        .send(
          "Oh, acho que você escreveu o comando errado... Dê uma olhada na ortografia"
        )
        .then(m => {
          m.delete({ timeout: 4000 });
          message.delete({ timeout: 4000 });
        });
    }
  });
};
