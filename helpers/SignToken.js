  const jwt = require("jsonwebtoken");

function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    "QuocBinh",
    {
      expiresIn: 24 * 60 * 60,
    }
  );
}

module.exports = { signToken };
