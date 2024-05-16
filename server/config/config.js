require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  db: {
    url: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
  },
  oauth: {
    hostname: process.env.OAUTH_HOSTNAME,
    tokenPath: process.env.OAUTH_PATH,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: process.env.OAUTH_AUTHORIZATION,
    },
  },
};
