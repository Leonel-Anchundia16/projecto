// utils/bcrypt.js

const bcrypt = require("bcrypt");

async function hash(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function compare(password, hashedPassword) {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
}

module.exports = {
  hash,
  compare,
};
