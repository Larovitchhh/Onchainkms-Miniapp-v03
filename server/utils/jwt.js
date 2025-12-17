const jwt = require("jsonwebtoken");

function createJwt(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

module.exports = {
  createJwt,
};
