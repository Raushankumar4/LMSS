const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  try {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "4d" }
    );
    return token;
  } catch (error) {
    console.error("JWT Generation Error:", error);
    return null;
  }
};
module.exports = generateToken;
