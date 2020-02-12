const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { checkAuthenticated } = require("../config/auth");

router.get("/", checkAuthenticated, dashboardController.index);

module.exports = router;
