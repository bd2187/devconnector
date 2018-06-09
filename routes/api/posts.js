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
  @desc   Get post
  @access Public
*/
router.get("/", function(req, res) {
  Posts.find({})
    .sort({ date: -1 })
    .then(function(posts) {
      if (!posts) {
        return res.status(404).json({ msg: "Error fetching posts" });
      }

      return res.json(posts);
    })
    .catch(function(err) {
      return res.status(400).json({ msg: "Error fetching posts", err });
    });
});

/*
  @route  GET api/posts/:id
  @desc   Get post by id
  @access Public
*/
router.get("/:id", function(req, res) {
  console.log(req.params.id);
  Posts.findById(req.params.id, function(err, post) {
    return err
      ? res.status(404).json({ status: "failed", err })
      : res.json(post);
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

  const newPost = new Posts({
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
