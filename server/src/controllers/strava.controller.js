const {
  getClubActivities
} = require("../services/stravaClub.service");

async function clubActivities(req, res) {
  try {
    const activities = await getClubActivities();
    res.json({ activities });
  } catch (err) {
    console.error("Strava error:", err.message);
    res.status(500).json({ error: "Strava unavailable" });
  }
}

module.exports = {
  clubActivities
};


