// utils/jwt.js

const jwt = require("jsonwebtoken");
const { KEY_TOKEN } = require("./constant");

function sign(payload) {
  const token = jwt.sign(payload, KEY_TOKEN, {
    expiresIn: "1h",
  });
  return token;
}

module.exports = {
  sign,
};
