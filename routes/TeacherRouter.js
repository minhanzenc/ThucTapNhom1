const { Router } = require("express");
const router = Router({ mergeParams: true });
const teacherService = require("../services/TeacherServices");
const classRoomServices = require("../services/ClassRoomServices");
const { CustomError } = require("../errors/CustomError");
const accountService = require("../services/AccountService");
const { default: mongoose } = require("mongoose");
const { createTeacherDTO, updateTeacherDTO } = require("../dtos/TeacherDTO");
const { deleteTeacherDTO } = require("../dtos/TeacherDTO");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
router
  .get("/", verifyToken, authorize(["admin"]), async (req, res) => {
    try {
      const { query } = req;
      const teacher = await teacherService.getAll(query);
      return res.status(200).json(teacher);
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
        const teacher = await teacherService.getOneById(id);
        return res.status(200).json(teacher);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  )
  .post("/", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const teacherDTO = createTeacherDTO(req.body);
      if (teacherDTO.hasOwnProperty("errMessage"))
        throw new CustomError(teacherDTO.errMessage, 400);
      const createdAccount = await accountService.create(
        {
          email: teacherDTO.data.email,
          password: uuidv4(),
          role: "teacher",
        },
        session
      );
      const createdTeacher = await teacherService.create(
        { ...teacherDTO.data, r_account: createdAccount[0]._id },
        session
      );
      await session.commitTransaction();
      // let transporter = nodemailer.createTransport({
      //   host: "smtp.gmail.com",
      //   port: 587,
      //   secure: false, // true for 465, false for other ports
      //   auth: {
      //     user: "minhanzenc@gmail.com", // generated ethereal user
      //     pass: "vngwetijvqacllke",
      //   },
      //   //eznlnrubumhqewrb
      // });

      // // send mail with defined transport object
      // await transporter.sendMail({
      //   from: '"Phong dao tao " <minhanzenc@gmail.com>', // sender address
      //   to: createdAccount[0].email, // list of receivers0
      //   subject: "Vui long dang nhap vao day de doi mat khau", // Subject line
      //   html: `<h1>mat khau cua ban la: ${createdAccount[0].password}</h1>`, // html body
      // });
      res.status(201).json(createdTeacher);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: error.message });
      console.error(error.toString());
    }
  })
  .delete("/:id", verifyToken, authorize(["admin"]), async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const check = await classRoomServices.getByTeacherId(req.params.id);
      const teacher=await teacherService.getOneById(req.params.id);
      if (check.length > 0) {
        throw new CustomError('Không xóa được vì giáo viên có lớp', 400);
      }
      const teacherDTO = deleteTeacherDTO(req.params.id);
      if (teacherDTO.hasOwnProperty("errMessage"))
        throw new CustomError(teacherDTO.errMessage, 400);
      await teacherService.deleteOne(teacherDTO.data.id, session);
      await session.commitTransaction();
      res.status(201).json({ message: "Xóa thành công" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: "Server has something wrong!!" });
      console.error(error.toString());
    }
  })
  .put("/:id", verifyToken, authorize(["teacher"]), async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const teacherDTO = updateTeacherDTO(req.params.id, req.body);
      if (teacherDTO.hasOwnProperty("errMessage"))
        throw new CustomError(teacherDTO.errMessage, 400);
      const updatedTeacher = await teacherService.update(
        teacherDTO.data,
        session
      );
      await session.commitTransaction();
      res.status(201).json(updatedTeacher);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json("Server has something wrong!!");
      console.error(error.toString());
    }
  });

module.exports = { router };
