const express = require("express");
const router = express.Router();

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

module.exports = router;
