const express = require("express");
const router = express.Router();
const passport = require("passport");
const keys = require("../config/config");
const mongoose = require("mongoose");
const User = require("../models/User");


router.get("/api/soulbound/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const soulboundSocials = user.socials.filter(
        (social) => social.soulbound_flag === 1
      );
  
      return res.status(200).json({ socials: soulboundSocials });
    } catch (error) {
      console.error("Error while fetching soulbound identities:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;