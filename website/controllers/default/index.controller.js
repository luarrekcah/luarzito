const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
// const { userService } = require('../services');

const renderLanding = catchAsync(async (req, res) => {
  res.render("pages/landing/index")
});

module.exports = { renderLanding };
