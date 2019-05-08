// Keys.js -- figure out what se of credentials to return

if (process.env.NODE_ENV === "production") {
  // We are in production - return the prod set of keys
  module.exports = require("./prod");
} else {
  // We are in devlopment - return the dev keys !!
  module.exports = require("./dev");
}
