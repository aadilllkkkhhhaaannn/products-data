const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../Authentication/Controllers/userController");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;
