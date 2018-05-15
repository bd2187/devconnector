const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.end("hello");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Now listening to port ${port}`);
});
