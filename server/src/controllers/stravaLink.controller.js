const {
  linkStrava,
  getLinkedAthlete
} = require("../services/stravaLink.service");

exports.link = (req, res) => {
  const { fid, athlete } = req.body;

  if (!fid || !athlete) {
    return res.status(400).json({ error: "Missing fid or athlete" });
  }

  const linked = linkStrava(fid, athlete);

  res.json({
    ok: true,
    fid,
    athlete: linked
  });
};

exports.get = (req, res) => {
  const fid = req.params.fid;
  const athlete = getLinkedAthlete(fid);

  res.json({ fid, athlete });
};
