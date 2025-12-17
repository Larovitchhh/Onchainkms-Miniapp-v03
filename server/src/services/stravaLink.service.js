const fs = require("fs");
const path = require("path");

const FILE = path.join(
  __dirname,
  "../../data/strava-links.json"
);

function readLinks() {
  if (!fs.existsSync(FILE)) return {};
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function saveLinks(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function linkStrava(fid, athlete) {
  const links = readLinks();
  links[fid] = athlete;
  saveLinks(links);
  return links[fid];
}

function getLinkedAthlete(fid) {
  const links = readLinks();
  return links[fid] || null;
}

module.exports = {
  linkStrava,
  getLinkedAthlete
};
