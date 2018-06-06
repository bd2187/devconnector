const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");

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
router.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  const errors = {};

  // Find user
  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
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
});

/*
  @route  GET api/profile/handle/:handle
  @desc   Get profile by handle
  @access Public
*/
router.get("/handle/:handle", function(req, res) {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(function(profile) {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(function(err) {
      res
        .status(404)
        .json({ profile: "There is no profile for this user", error: err });
    });
});

/*
  @route  GET api/profile/user/:user_id
  @desc   Get profile by user ID
  @access Public
*/
router.get("/user/:user_id", function(req, res) {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(function(profile) {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(function(err) {
      res
        .status(404)
        .json({ profile: "There is no profile for this user", error: err });
    });
});

/*
  @route  GET api/profile/all
  @desc   Get all profiles
  @access Public
*/

router.get("/all", function(req, res) {
  const errors = {};
  Profile.find({})
    .populate("user", ["name", "avatar"])
    .then(function(profiles) {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      return res.json(profiles);
    })
    .catch(function(err) {
      res
        .status(404)
        .json({ profile: "There is no profile for this user", error: err });
    });
});

/*
  @route  POST api/profile/
  @desc   Creat or edit user profile
  @access Private
*/
router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername) {
    profileFields.githubusername = req.body.githubusername;
  }

  // Skills -- split into array
  if (typeof req.body.skills !== undefined) {
    profileFields.skills = req.body.skills.split(",");
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(function(profile) {
    if (profile) {
      // If profile exists, update the profile
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(function(profile) {
        return res.json(profile);
      });
    } else {
      // Otherwise, create profile

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(function(profile) {
        if (profile) {
          errors.handle = "That handle already exists";
          return res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(function(newProfile) {
          return res.json(newProfile);
        });
      });
    }
  });
});

module.exports = router;
