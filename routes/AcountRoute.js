const { Router } = require("express");
const router = Router({ mergeParams: true });

const nodemailer = require("nodemailer");
const { CustomError } = require("../errors/CustomError");
const { loginAccountDto } = require("../dtos/AccountDTO");
const AccountService = require("../services/AccountService");

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

module.exports = { router };
