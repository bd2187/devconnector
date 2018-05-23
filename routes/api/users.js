const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

/*
  @route  GET api/users/
  @desc   
  @access Public
*/
router.get("/", function(req, res) {
  res.json({
    status: "success",
    message: "users api"
  });
});

/*
  @route  GET api/users/register
  @desc Register user   
  @access Public
*/
router.post("/register", function(req, res) {
  // Check if email exists
  User.findOne({ email: req.body.email }).then(function(user) {
    if (user) {
      // If email already exists, return status 400
      return res.status(400).json({ email: "Email already exists" });
    } else {
      // Load gravatar image with email
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" //  default
      });

      // Create a new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: avatar
      });

      // Generate salt for user's password
      bcrypt.genSalt(10, function(err, salt) {
        // Hash the password
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          if (err) throw err;

          // Store hashed password in newUser.password
          newUser.password = hash;

          // Save newUser to DB
          newUser
            .save()
            .then(function(user) {
              res.json(user);
            })
            .catch(function(err) {
              console.log("Error saving user to DB", err);
            });
        });
      });
    }
  });
});

/*
  @route  GET api/users/login
  @desc   Login user / Returning JWT Token
  @access Public
*/

router.post("/login", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(function(user) {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(function(isMatch) {
      if (isMatch) {
        res.json({ message: "success" });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
