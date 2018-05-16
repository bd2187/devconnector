const express = require("express");
const router = express.Router();

/*
  @route  GET api/profile/
  @desc   
  @access Public
*/
router.get("/", function(req, res) {
  res.json({
    status: "success",
    message: "profile api"
  });
});

module.exports = router;
