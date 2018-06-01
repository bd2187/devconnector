const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load User and Profile models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

/*
  @route  GET api/test
  @desc   
  @access Public
*/
router.get("/test", function(req, res) {
  res.json({
    status: "success",
    message: "profile api"
  });
});

/*
  @route  GET api/profile/
  @desc   
  @access Private
*/
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    const errors = {};

    // Find user
    Profile.findOne({ user: req.user.id })
      .then(function(profile) {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(function(err) {
        return res.status(400).json(err);
      });
  }
);

module.exports = router;
