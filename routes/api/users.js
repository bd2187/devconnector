const express = require("express");
const router = express.Router();

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

module.exports = router;
