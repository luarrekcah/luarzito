const express = require("express");
const auth = require("../../middlewares/auth");
const { dashboardController } = require("../../controllers");
const guildAccess = require("../../middlewares/guildAcess");

const router = express.Router();

router.route("/").get(auth(), dashboardController.renderDashboard);

router.route("/guild/:ID").get(auth(), guildAccess(), dashboardController.renderGuildConfig);

module.exports = router;
