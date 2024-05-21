const mongoose = require("mongoose");

const ReferralCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  referee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("ReferralCode", ReferralCodeSchema);
