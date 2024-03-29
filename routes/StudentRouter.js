const { Router } = require("express");
const router = Router({ mergeParams: true });
const studentService = require("../services/StudentServices");
const { CustomError } = require("../errors/CustomError");
const { default: mongoose } = require("mongoose");
const { createStudentDTO } = require("../dtos/StudentDTO");
const { deleteStudentDTO, updateStudentDTO } = require("../dtos/StudentDTO");
const { readFile } = require("../helpers/excel");
const nodemailer = require("nodemailer");
const accountService = require("../services/AccountService");
const { v4: uuidv4 } = require("uuid");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
router
  .get("/", verifyToken, authorize(["teacher", "admin"]), async (req, res) => {
    try {
      const { query } = req;
      const student = await studentService.getAll(query);
      return res.status(200).json(student);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get(
    "/:id",
    verifyToken,
    authorize(["teacher", "admin"]),
    async (req, res) => {
      try {
        const { id } = req.params;
        const student = await studentService.getOneById(id);
        return res.status(200).json(student);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  )
  .post("/", verifyToken, authorize(["teacher", "admin"]), async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const studentDTO = createStudentDTO(req.body);
      if (studentDTO.hasOwnProperty("errMessage"))
        throw new CustomError(studentDTO.errMessage, 400);
      const createdAccount = await accountService.create(
        {
          email: studentDTO.data.email,
          password: uuidv4(),
          role: "student",
        },
        session
      );
      console.log(createdAccount);
      const createdStudent = await studentService.create(
        { ...studentDTO.data, r_account: createdAccount[0]._id },
        session
      );
      await session.commitTransaction();
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'testapi231@gmail.com', // generated ethereal user
          pass: 'knasbslpqshqhnlw'
        },
        //eznlnrubumhqewrb
      });

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Phòng đào tạo" <testapi231@gmail.com>', // sender address
        to: createdAccount[0].email, // list of receivers0
        subject: "Vui lòng đăng nhập vào đây để đổi mật khẩu", // Subject line
        html: `<h1>Mật khẩu của bạn là: ${createdAccount[0].password}</h1>`, // html body
      });

      res.status(201).json(createdStudent);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: error.message });
      console.error(error.toString());
    }
  })
  .post(
    "/import-by-excel",
    verifyToken,
    authorize(["teacher", "admin"]),
    async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const excelFile = req.files.excelFile.data;
        let creatingStudents = readFile(excelFile);
        const creatingAccounts = creatingStudents.map((stu) => {
          return {
            email: stu.email,
            password: uuidv4(),
            role: "student",
          };
        });
        const createdAccounts = await accountService.createMany(
          creatingAccounts,
          session
        );
        creatingStudents = creatingStudents.map((stu) => {
          const foundAccount = createdAccounts.find(
            (a) => a.email === stu.email
          );
          return {
            ...stu,
            r_account: foundAccount.id,
          };
        });
        const createdStudent = await studentService.createMany(
          creatingStudents
        );

        await session.commitTransaction();

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'testapi231@gmail.com', // generated ethereal user
            pass: 'knasbslpqshqhnlw'
          },
        });

        // send mail with defined transport object
        for (const account of createdAccounts) {
          await transporter.sendMail({
            from: '"Phòng đào tạo " <testapi231@gmail.com>', // sender address
            to: account.email, // list of receivers0
            subject: "Vui lòng đăng nhập vào đây để đổi mật khẩu", // Subject line
            html: `<h1>Mật khẩu của bạn là: ${account.password}</h1>`, // html body
          });
        }
        res.status(201).json(createdStudent);
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error instanceof CustomError)
          res.status(error.code).json({ message: error.message });
        else res.status(500).json({ message: error.message })
        console.error(error.toString());
      }
    }
  )
  .delete(
    "/:id",
    verifyToken,
    authorize(["teacher", "admin"]),
    async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const studentDTO = deleteStudentDTO(req.params.id);
        if (studentDTO.hasOwnProperty("errMessage"))
          throw new CustomError(studentDTO.errMessage, 400);
        await studentService.deleteOne(studentDTO.data.id, session);
        await session.commitTransaction();
        res.status(201).json({ message: "xoa thanh cong" });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error instanceof CustomError)
          res.status(error.code).json({ message: error.message });
        else res.status(500).json({ message: error.message })
        console.error(error.toString());
      }
    }
  )
  .put(
    "/:id",
    verifyToken,
    authorize(["teacher", "admin"]),
    async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const studentDTO = updateStudentDTO(req.params.id, req.body);
        if (studentDTO.hasOwnProperty("errMessage"))
          throw new CustomError(studentDTO.errMessage, 400);
        const updatedStudent = await studentService.update(
          { ...studentDTO.data },
          session
        );
        await session.commitTransaction();
        res.status(201).json(updatedStudent);
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error instanceof CustomError)
          res.status(error.code).json({ message: error.message });
        else res.status(500).json({ message: error.message })
        console.error(error.toString());
      }
    }
  );
module.exports = { router };
