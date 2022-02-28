const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", (req, res) => {
  const register = req.body;
});

module.exports = router;
