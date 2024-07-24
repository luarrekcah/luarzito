const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const client = require('../../../bot');
// const { userService } = require('../services');

const renderDashboard = catchAsync(async (req, res) => {
  res.render("pages/dashboard/index")
});

module.exports = { renderDashboard };
