const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

function generateJwtToken(account) {
  return jwt.sign(
    { sub: account.id, id: account.id, role: account.role },
    config.get('secret'),
    { expiresIn: '15m' }
  );
}

function generateRefreshToken(account, ipAddress) {
  return {
    accountId: account.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    createdByIp: ipAddress
  };
}

module.exports = {
  randomTokenString,
  generateJwtToken,
  generateRefreshToken
};