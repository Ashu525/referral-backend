const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/authentication");
// router.use(verifyToken);
const {
  createReferralCode,
  verifyReferralCode,
  updateRefereePoints,
  getReferralPoints,
} = require("../controllers/referralController");

// Route for generating a referral code
router.post("/generate", verifyToken, createReferralCode);

// Route for verifying a referral code
router.get("/verify/:code", verifyReferralCode);

router.get("/updateRefereePoints/:code", verifyToken, updateRefereePoints);

router.get("/getReferralPoints", verifyToken, getReferralPoints);

module.exports = router;
