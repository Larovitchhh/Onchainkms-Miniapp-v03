const express = require("express");
const {
  clubRanking
} = require("../controllers/stravaRanking.controller");

const router = express.Router();

router.get("/ranking", clubRanking);

module.exports = router;
