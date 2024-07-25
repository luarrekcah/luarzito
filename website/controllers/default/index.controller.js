const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const client = require('../../../bot');
// const { userService } = require('../services');

const botClient = client;

const renderLanding = catchAsync(async (req, res) => {
  const data = {
    user: req.user,
    statistics: {
      servers: botClient.guilds.cache.size || "+400",
      users: "+100k", // botClient.users.cache.size || "+100k",
      commands: botClient.commands.filter(cmd => cmd.data.description !== "Desenvolvedor apenas").size || 0,
      coffes: 500
    }
  }
  res.render("pages/landing/index", data);
});

const renderCommands = catchAsync(async (req, res) => {
  const data = {
    user: req.user,
    commands: botClient.commands
  }
  res.render("pages/landing/commands", data)
});

module.exports = { renderLanding, renderCommands };
