require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) return res.status(403).json({ message: "chưa truyền token" });
  try {
    const decoded = jwt.verify(token, "QuocBinh");
    if (!decoded.id)
      return res
        .status(401)
        .json({ message: "token hết hạn, xin đăng nhập lại" });
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "token không hợp lệ" });
  }
};

// Phan quyen
const authorize = (userTypeArray) => {
  return (req, res, next) => {
    const { user } = req;
    const dk =
      userTypeArray.findIndex((type) => {
        return type === user.role;
      }) > -1;
    if (dk) {
      return next();
    } else {
      res.status(403).send({
        message: "Bạn đã đăng nhập , nhưng không có đủ quyền",
      });
    }
  };
};

module.exports = { verifyToken, authorize };
