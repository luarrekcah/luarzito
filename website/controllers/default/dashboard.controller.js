const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const client = require('../../../bot');
// const { userService } = require('../services');

const renderDashboard = catchAsync(async (req, res) => {
  const userGuilds = req.user.guilds;
  const botGuilds = client.guilds.cache;

  const guildsWithBotStatus = userGuilds.map(guild => {
    const botInGuild = botGuilds.has(guild.id);
   
    return { ...guild, botInGuild };
  });

  const data = {
    user: req.user,
    guilds: guildsWithBotStatus
  }
  res.render("pages/dashboard/index", data)
});

const renderGuildConfig = catchAsync(async (req, res) => {
  const guildID = req.params.ID;

  const guild = client.guilds.cache.get(guildID);

  console.log(guild)

  const data = {
    user: req.user,
    guild
  }
  res.render("pages/dashboard/config", data)
});

module.exports = { renderDashboard, renderGuildConfig };
