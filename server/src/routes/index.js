router.use("/auth", require("./auth"));
router.use("/strava", require("./strava.routes"));
router.use("/strava/link", require("./stravaLink.routes"));
