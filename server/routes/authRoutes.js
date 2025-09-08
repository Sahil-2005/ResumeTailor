const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { googleLogin } = require("../controllers/authController");


// POST /api/auth/register
router.post("/register", registerUser);

router.post("/google", googleLogin);


// POST /api/auth/login
router.post("/login", loginUser);

module.exports = router;
