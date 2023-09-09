const express = require("express");
const passport = require("passport");
const keys = require("../config/config");
const mongoose = require("mongoose");
const User = mongoose.model("Users");

module.exports = app => {
  app.get("/", (req, res) => {
    res.status(200).json({
      googleClientID: keys.GOOGLE_CLIENT_ID,
      googleCLientSecret: keys.GOOGLE_CLIENT_SECRET
    });
  });

  // google routes
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      const newUser = new User({
        userId: req.user.id, 
        username: req.user.username,
        picture: req.user.picture,
        id_social: "google", 
      });
  
      
      newUser.save()
        .then(user => {
          console.log("User Info stored:", user);
          res.redirect("/profile"); 
        })
        .catch(error => {
          console.error("Cannot store:", error);
          res.redirect("/"); 
        });
    }
  );

  // facebook routes
  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function(req, res) {
      console.log("i am in fb callback");
      const newUser = new User({
        userId: req.user.id, 
        username: req.user.username,
        picture: req.user.picture,
        id_social: "facebook", 
      });
  
      
      newUser.save()
        .then(user => {
          console.log("User Info stored:", user);
          res.redirect("/profile"); 
        })
        .catch(error => {
          console.error("Cannot store:", error);
          res.redirect("/"); 
        });
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/"); // log out case
    // res.send(req.user);
  });
};
