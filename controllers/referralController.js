const keys = require("../config/keys");
const ReferralCode = require("../models/ReferralCode");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// Function to generate a unique referral code
const generateReferralCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// Controller function to create a new referral code
exports.createReferralCode = async (req, res) => {
  try {
    // Generate a unique referral code
    let code = generateReferralCode();
    // Check if the generated code already exists
    while (await ReferralCode.findOne({ code })) {
      code = generateReferralCode();
    }
    // Create the referral code
    const referralCode = new ReferralCode({
      code,
      referee: req.user.id, // Assuming user ID is stored in req.user
    });
    await referralCode.save();
    res
      .status(201)
      .json({ message: "Referral code created successfully", referralCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to verify a referral code
exports.verifyReferralCode = async (req, res) => {
  try {
    const { code } = req.params;
    const referralCode = await ReferralCode.findOne({ code });
    if (!referralCode) {
      return res.status(404).json({ error: "Invalid referral code" });
    }
    res.status(200).json({ message: "Referral code verified", referralCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateRefereePoints = async (req, res) => {
  try {
    // Allocate points to the referee (optional)
    const codeInfo = await ReferralCode.findOne({
      code: req.params.code,
    });
    const referee = await User.findById(codeInfo.referee);
    referee.points += 10; // Assuming 10 points are awarded for each referral
    await referee.save();
    res.status(200).json({ message: "Referral points added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getReferralPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ message: "Referral points", points: user.points });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
