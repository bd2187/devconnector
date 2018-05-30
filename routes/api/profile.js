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
    // Find user
  }
);

module.exports = router;
