const Discord = require("discord.js");
const Canvas = require("canvas");

exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  if (!message.guild.me.permissions.has("ATTACH_FILES"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `ATTACH_FILES` para continuar"
      );
  try {
    const canvas = Canvas.createCanvas(900, 500); //250;
    const ctx = canvas.getContext("2d");
    const botID = bot.users.cache.get("743841329334845530");
    const botAvatar = botID.avatarURL({
      dynamic: true,
      format: "png",
      size: 1024
    });
    let totalSeconds = bot.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let uptime = `Tempo desde a última parada: \n> ${days.toFixed()} dias\n> ${hours.toFixed()} horas\n> ${minutes.toFixed()} minutos\n> ${seconds.toFixed()} segundos`;

    const aguarde = await message.channel.send(
      "<a:alerta:758339902386733098> | Espere, estou pegando minhas informações..."
    );

    const latenciaSV = aguarde.createdTimestamp - message.createdTimestamp;

    const sistema = `CPU: ${(process.cpuUsage().system / 1024 / 1024).toFixed(
      2
    )}% \nRAM: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
      2
    )}MB / 2GB \nLatência da API: ${Math.round(
      bot.ws.ping
    )}ms\nLatência do Servidor: ${latenciaSV}ms`;

    const fundos = [
      "https://cdn.discordapp.com/attachments/742068003583295623/793675097469878282/Bgnzinho_Img027.png",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688720393633822/Bgnzinho_Img003.png",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688749212041216/Bgnzinho_Img006.png",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688757378613268/Bgnzinho_Img024.png",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688765490135050/Bgnzinho_Img025.png",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688766094377010/Bgnzinho_Img009.png",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688773711233074/Bgnzinho_Img013.png",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688781273825340/Bgnzinho_Img047.png",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688820733313054/Bgnzinho_Img137.jpg",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688825133662248/Bgnzinho_Img138.jpg",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688829285892116/Bgnzinho_Img141.jpg",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688832121765908/Bgnzinho_Img142.jpg",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688831609405460/Bgnzinho_Img034.png",
      "https://cdn.discordapp.com/attachments/742068003583295623/793688836819124244/Bgnzinho_Img143.jpg"
    ];

    const background_wall = await Canvas.loadImage(
      fundos[Math.floor(Math.random() * fundos.length + 1) - 1]
    );
    ctx.drawImage(background_wall, 0, 0, canvas.width, canvas.height);

    const background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/742068003583295623/793687485988470794/luarzito_ping_comando.png"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = "50px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Sistema geral`, canvas.width / 2.5, canvas.height / 3.5);

    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${sistema}`, canvas.width / 2.5, canvas.height / 2.5);
    /*
  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    ``,
    canvas.width / 2.5,
    canvas.height / 2.0 //1.5
  );
  */

    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${uptime}`,
      canvas.width / 2.5,
      canvas.height / 1.5 //1.5
    );

    //${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const iconPrincipal = await Canvas.loadImage(botAvatar);
    ctx.drawImage(iconPrincipal, 25, 25, 200, 200);

    /*
  if (bot.user.presence.status === "online") {
    const online = await Canvas.loadImage("https://cdn.discordapp.com/attachments/757308101182357518/759938144451035197/pngwing.com_3.png")
    ctx.drawImage(online, 120, 180, 80, 80); //dois ultimos sao tamanho
  }
*/

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "luarzito.png"
    );
    const finalEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setImage("attachment://luarzito.png")
      .addField("🔀Sinônimos:", "`uptime`, `ping`, `tempo ativo`");
    message.channel.send(message.author, attachment).then(aguarde.delete());
  } catch (e) {
    console.log(e);
  }
};
