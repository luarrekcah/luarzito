const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const client = require('../../../bot');
// const { userService } = require('../services');

const renderLanding = catchAsync(async (req, res) => {
  const data = {
    user: req.user
  }
  res.render("pages/landing/index", data)
});

const renderCommands = catchAsync(async (req, res) => {
  const botClient = client;
  const data = {
    user: req.user,
    commands: botClient.commands
  }
  res.render("pages/landing/commands", data)
});

module.exports = { renderLanding, renderCommands };
