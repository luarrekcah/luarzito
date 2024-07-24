const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const client = require('../../../bot');
// const { userService } = require('../services');

const renderLanding = catchAsync(async (req, res) => {
  res.render("pages/landing/index")
});

const renderCommands = catchAsync(async (req, res) => {
  const botClient = client;
  const data = {
    commands: botClient.commands
  }
  res.render("pages/landing/commands", data)
});

module.exports = { renderLanding, renderCommands };
