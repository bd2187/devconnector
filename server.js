const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// API ROUTES
const usersRoutes = require("./routes/api/users");
const postsRoutes = require("./routes/api/posts");
const profileRoutes = require("./routes/api/profile");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DATABASE CONFIG & CONNECTION
const { mongoURI: db } = require("./config/keys");
mongoose
  .connect(db)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("\x1b[33m%s\x1b[0m", "Connection err"));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

// API ROUTES
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Now listening to port ${port}`);
});
