// prod.js - production keys here!!

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  facebookClientID: process.env.FACEBOOK_CLIENT_ID,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  cookieKey: process.env.COOKIE_KEY
};
