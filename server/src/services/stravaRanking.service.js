const { getClubActivities } = require("./stravaClub.service");
const {
  normalizeActivity,
  calculateXp
} = require("./stravaXp.service");

const MAX_ACTIVITIES = 100; // ranking rolling

async function getRollingRanking() {
  const activities = await getClubActivities();

  const normalized = activities
    .slice(0, MAX_ACTIVITIES)
    .map(normalizeActivity)
    .filter(a => a); // elimina nulls

  const rankingMap = {};

  for (const act of normalized) {
    const xp = calculateXp(act);

    if (!rankingMap[act.athlete]) {
      rankingMap[act.athlete] = {
        athlete: act.athlete,
        kms: 0,
        time_min: 0,
        elevation_m: 0,
        activities: 0,
        xp: 0
      };
    }

    rankingMap[act.athlete].kms += act.kms;
    rankingMap[act.athlete].time_min += act.time_min;
    rankingMap[act.athlete].elevation_m += act.elevation_m;
    rankingMap[act.athlete].activities += 1;
    rankingMap[act.athlete].xp += xp;
  }

  return Object.values(rankingMap)
    .sort((a, b) => b.xp - a.xp)
    .map((entry, index) => ({
      position: index + 1,
      athlete: entry.athlete,
      kms: Number(entry.kms.toFixed(2)),
      time_min: Math.floor(entry.time_min),
      elevation_m: Math.floor(entry.elevation_m),
      activities: entry.activities,
      xp: entry.xp
    }));
}

module.exports = {
  getRollingRanking
};
