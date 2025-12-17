const express = require("express");
const router = express.Router();
const controller = require("../controllers/stravaLink.controller");

router.post("/link", controller.link);
router.get("/:fid", controller.get);

module.exports = router;
