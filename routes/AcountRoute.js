const { Router } = require("express");
const router = Router({ mergeParams: true });

const nodemailer = require("nodemailer");
const { CustomError } = require("../errors/CustomError");
const { loginAccountDto, deleteAccountDTO } = require("../dtos/AccountDTO");
const AccountService = require("../services/AccountService");
const studentService = require("../services/StudentServices");
const { verifyToken } = require("../middlewares/VerifyToken");

const { default: mongoose } = require("mongoose");
const student = require("../models/StudentModel");

router
  .post("/login", async (req, res) => {
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
  })
  // .delete("/:id", async (req, res) => {
  //   const session = await mongoose.startSession()
  //   session.startTransaction()
  //   try {
  //     const accountDTO = deleteAccountDTO(req.params.id)
  //     if (accountDTO.hasOwnProperty("errMessage"))
  //       throw new CustomError(accountDTO.errMessage, 400)
  //     const students =await studentService.getByAccountID(req.params.id)
  //     await studentService.deleteOne(students._id)
  //     await AccountService.deleteOne(accountDTO.data.id, session);
  //     await session.commitTransaction();
  //     res.status(201).json();
  //   } catch (error) {
  //     await session.abortTransaction();
  //     session.endSession();
  //     if (error instanceof CustomError)
  //       res.status(error.code).json({ message: error.message });
  //     else res.status(500).json({ message: error.message });

  //     console.log(error.toString);
  //   }
  // })
module.exports = { router };
