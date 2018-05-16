const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DATABASE CONFIG & CONNECTION
const { mongoURI: db } = require("./config/keys");
mongoose
  .connect(db)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("\x1b[33m%s\x1b[0m", "Connection err"));

app.get("/", function(req, res) {
  res.send("hello!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Now listening to port ${port}`);
});
