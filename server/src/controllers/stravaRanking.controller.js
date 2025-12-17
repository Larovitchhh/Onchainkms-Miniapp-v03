const { getRollingRanking } = require("../services/stravaRanking.service");

async function clubRanking(req, res) {
  try {
    const ranking = await getRollingRanking();

    res.json({
      scope: "last_100_activities",
      ranking
    });
  } catch (err) {
    console.error("Ranking error:", err.message);
    res.status(500).json({ error: "Ranking unavailable" });
  }
}

module.exports = {
  clubRanking
};
