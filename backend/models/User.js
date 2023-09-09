const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: String,
  id: String,
  picture: String,
  socials: [
    {
      id: String,
      platform: String,
      soulbound_flag: Number,
    },
  ],
  user_id: String,
  user_name: String,
});

mongoose.model("Users", userSchema);
