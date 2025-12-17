const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/strava-token.json");

function getTokenData() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveTokenData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  getTokenData,
  saveTokenData
};
