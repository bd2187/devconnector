const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load User and Posts models
const User = require("../../models/User");
const Posts = require("../../models/Posts");

// Validation
const validatePostInput = require("../../validation/post");

/*
  @route  GET api/posts/
  @desc   
  @access Public
*/
router.get("/", function(req, res) {
  res.json({
    status: "success",
    message: "posts api"
  });
});

/*
  @route  POST api/posts/
  @desc   Create post
  @access Private
*/

router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(function(post) {
    return res.json(post);
  });
});

module.exports = router;
