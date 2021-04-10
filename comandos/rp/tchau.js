const Discord = require("discord.js");

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  var list = [
    "https://media.tenor.com/images/4b9b18c7aae49b108354a22a0cb615fc/tenor.gif",
    "https://media.tenor.com/images/33ee3367675a99d39888a7ad273e0291/tenor.gif"
  ];

  var rand = list[Math.floor(Math.random() * list.length)];
  let user = message.mentions.users.first() || bot.users.cache.get(argumentos[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para dar tchau!');
}

let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Byee')
        .setColor('#000000')
        .setDescription()
        .setImage(rand)
        .setTimestamp()
        .setThumbnail()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(`${message.author} Deu tchau para ${user}`,embed);
}