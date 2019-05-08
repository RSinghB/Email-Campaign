const express = require("express");
const mainRoutes = require("./routes/mainRoute");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./Config/keys");
const mongooes = require("mongoose");
require("./models/User");
require("./servies/passport");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
); //Middleware

app.use(passport.initialize()); // Middleware
app.use(passport.session()); // Middleware

mongooes.connect(keys.mongoConnectionString);

require("./routes/authRoutes")(app);
mainRoutes(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT);
