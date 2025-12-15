const express = require("express");
const {
  connectStrava,
  stravaCallback,
  syncStrava,
} = require("../controllers/strava.controller");

const router = express.Router();

router.get("/connect", connectStrava);
router.get("/callback", stravaCallback);
router.post("/sync", syncStrava);

module.exports = router;
