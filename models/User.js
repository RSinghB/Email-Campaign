const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  ProfileId: String,
  DisplayName: String,
  Provider: String,
  EmailId: String
});

mongoose.model("users", userSchema);
