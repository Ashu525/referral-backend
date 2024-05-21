const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getToken } = require("../utils/authentication");

// Route for Apple authentication
router.post("/apple", passport.authenticate("apple"), (req, res) => {
  // Create JWT token
  const token = getToken({ id: req.user._id, username: req.user.username });
  res.redirect(`/dashboard?token=${token}`);
});

router.get(
  "/google-login",
  passport.authenticate("google", { session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://main--react-referral-system.netlify.app/",
    session: false,
  }),
  (req, res) => {
    console.log("Google callback", req.user);
    const token = getToken({ id: req.user._id, username: req.user.username });
    res.redirect(
      `https://main--react-referral-system.netlify.app/home?token=${token}`
    );
  }
);

module.exports = router;
