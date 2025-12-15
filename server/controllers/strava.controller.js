function connectStrava(req, res) {
  return res.json({
    ok: true,
    message: "Strava connect endpoint (not implemented yet)",
  });
}

function stravaCallback(req, res) {
  return res.json({
    ok: true,
    message: "Strava callback endpoint (not implemented yet)",
  });
}

function syncStrava(req, res) {
  return res.json({
    ok: true,
    message: "Strava sync endpoint (not implemented yet)",
  });
}

module.exports = {
  connectStrava,
  stravaCallback,
  syncStrava,
};
