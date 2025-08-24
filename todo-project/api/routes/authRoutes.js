const express = require("express");
const { registerUser, loginUser, requestOtp, verifyOtp, getMe, logout } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", auth, getMe);
router.post("/logout", auth, logout);

module.exports = router;
