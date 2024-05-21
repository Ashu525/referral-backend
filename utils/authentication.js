const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const getToken = (payload) => {
  return jwt.sign(payload, keys.secret, { expiresIn: 36000 });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, keys.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { getToken, verifyToken };
