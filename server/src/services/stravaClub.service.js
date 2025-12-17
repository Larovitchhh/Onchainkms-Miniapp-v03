const fetch = require("node-fetch");
const {
  getValidStravaToken
} = require("./stravaAuth.service");

async function getClubActivities() {
  const token = await getValidStravaToken();

  const res = await fetch(
    `https://www.strava.com/api/v3/clubs/${process.env.STRAVA_CLUB_ID}/activities?per_page=30`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Strava club activities");
  }

  return res.json();
}

module.exports = {
  getClubActivities
};
