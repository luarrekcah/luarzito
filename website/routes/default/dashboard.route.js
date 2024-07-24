const express = require("express");
const auth = require("../../middlewares/auth");
const { dashboardController } = require("../../controllers");

const router = express.Router();

router.route("/").get(auth(), dashboardController.renderDashboard);

module.exports = router;
 