const Discord = require("discord.js");

exports.run = async (bot, message, argumentos) => {
  const p = await message.channel.send(
    message.author,
    new Discord.MessageEmbed().setColor("GREEN").setDescription("Menu 1")
  );
  await p.react("🛠️").then(p.react("🤝"));
  //  .then(p.react("⚠️"));
  /*
       await p.react("✅").then(() => {
         p.react("❎")
         p.react("⚠️")
       });*/

  const filter = (reaction, user) => {
    return (
      ["🛠️", "🤝" /*, "⚠️"*/].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };

  p.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] }).then(
    collected => {
      const reaction = collected.first();

      if (reaction.emoji.name === "🛠️") {
        p.edit(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription("Menu adm")
        );
      } else {
        p.edit(
          new Discord.MessageEmbed().setColor("GREEN").setDescription("Menu rp")
        );
      }
      p.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    }
    
  );
};
