const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

const PORT = process.env.PORT || 5001;

app.listen(PORT);
