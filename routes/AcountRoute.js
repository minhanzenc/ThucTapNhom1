const { Router } = require("express");
const router = Router({ mergeParams: true });

const nodemailer = require("nodemailer");
const { CustomError } = require("../errors/CustomError");
const { loginAccountDto } = require("../dtos/AccountDTO");
const AccountService = require("../services/AccountService");
const Account = require("../models/AccountModel");
const { verifyToken } = require("../middlewares/VerifyToken");

const { default: mongoose } = require("mongoose");

router.post("/login", async (req, res) => {
  try {
    const userDTO = loginAccountDto(req.body);
    if (userDTO.hasOwnProperty("errMessage"))
      throw new CustomError(userDTO.errMessage, 400);
    const signedToken = await AccountService.login(userDTO.data);
    return res.status(201).json(signedToken);
  } catch (error) {
    if (error instanceof CustomError)
      res.status(error.code).json({ message: error.message });
    else res.status(500).json({ message: "Server has something wrong!!" });
  }
});
//đổi mật khẩu
router.post("/change-password", verifyToken, async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const email = req.user.email;
    // Kiểm tra xem email của người dùng có tồn tại trong hệ thống hay không
    const account = await Account.findOne({ email, password });
    if (!account) {
      return res.status(404).json({
        message: "Tài khoản email không tồn tại hoặc password không đúng.",
      });
    }

    // Cập nhật mật khẩu mới
    // const salt = await bcrypt.genSaltSync(10);
    // const hashedPassword = await bcrypt.hashSync(newPassword, salt);
    account.password = newPassword;
    await account.save();

    return res.status(200).json({ message: "Mật khẩu đã được cập nhật." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});

module.exports = { router };
