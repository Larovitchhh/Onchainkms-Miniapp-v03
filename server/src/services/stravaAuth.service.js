const fetch = require("node-fetch");
const {
  getTokenData,
  saveTokenData
} = require("./stravaToken.store");

async function getValidStravaToken() {
  const tokenData = getTokenData();
  const now = Math.floor(Date.now() / 1000);

  if (now < tokenData.expires_at - 60) {
    return tokenData.access_token;
  }

  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: tokenData.refresh_token
    })
  });

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("Strava token refresh failed");
  }

  saveTokenData({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at
  });

  return data.access_token;
}

module.exports = {
  getValidStravaToken
};
