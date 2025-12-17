const express = require("express");
const { clubActivities } = require("../controllers/strava.controller");

const router = express.Router();

router.get("/club", clubActivities);

module.exports = router;
