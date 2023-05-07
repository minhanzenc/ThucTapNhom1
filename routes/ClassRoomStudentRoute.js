const { Router, json } = require("express");
const router = Router({ mergeParams: true });
const classRoomStudentServices = require("../services/ClassRoomStudentService");
const studentService = require("../services/StudentServices");
const classRoomService = require("../services/ClassRoomServices");
const { CustomError } = require("../errors/CustomError");

const { default: mongoose } = require("mongoose");
const {
  createClassRoomDTO,
  deleteClassRoomDTO,
  updateClassRoomDTO,
} = require("../dtos/ClassRoomDTO");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
const { validateArray } = require("../validation/validation");
const {
  createClassRoomStudentDto,
  deleteClassRoomStudentDto,
} = require("../dtos/ClassRoomStudentDTO");

router
  // .post("/", verifyToken, authorize(["teacher", "admin"]), async (req, res) => {
  //     const session = await mongoose.startSession()
  //     session.startTransaction()
  //     try {
  //         if (validateArray(req.body))
  //             throw new CustomError('vui long truyen mang du lieu');
  //         let classRoomStudentDTOs = req.body.map(item => createClassRoomStudentDto(item));
  //         const foundError = classRoomStudentDTOs.find(item => item.hasOwnProperty("errMessage"));
  //         if (foundError)
  //             throw new CustomError(foundError.errMessage, 400)

  //         const createdClassRoomStudents = await classRoomStudentServices.createMany(classRoomStudentDTOs.map(item => item.data), session);

  //         await session.commitTransaction();
  //         res.status(201).json(createdClassRoomStudents)

  //     } catch (error) {
  //         await session.abortTransaction();
  //         session.endSession();

  //         if (error instanceof CustomError)
  //             res.status(error.code).json({ message: error.message })
  //         else
  //             res.status(500).json({ message: error.message })
  //         console.error(error.toString())
  //     }

  // })
  .post("/", verifyToken, authorize(["teacher", "admin"]), async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const classRoomStudentDTO = createClassRoomStudentDto(req.body);
      if (classRoomStudentDTO.hasOwnProperty("errMessage"))
        throw new CustomError(classRoomStudentDTO.errMessage, 400);
      const createClassRoomStudent = await classRoomStudentServices.create(
        classRoomStudentDTO.data,
        session
      );
      await session.commitTransaction();
      res.status(201).json(createClassRoomStudent);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      if (11000 === error.code || 11001 === error.code) {
        const student = await studentService.getOneById(req.body.r_student);
        const classroom = await classRoomService.getOneById(
          req.body.r_classroom
        );
        res.status(400).json({
          message: `Sinh viên ${student.firstName} ${student.lastName} đã tồn tại trong lớp ${classroom.name} `,
        });
      } else res.status(500).json({ message: error.message });
      console.error(error.toString());
    }
  })
  .delete("/:id", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const classRoomStudentDTOs = deleteClassRoomDTO(req.params.id);
      if (classRoomStudentDTOs.hasOwnProperty("errMessage"))
        throw new CustomError(classRoomStudentDTOs.errMessage, 400);
      await classRoomStudentServices.deleteOne(
        classRoomStudentDTOs.data.id,
        session
      );
      await session.commitTransaction();
      res.status(201).json({ message: "Xoa thanh cong" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof CustomError)
        res.status(error.code), json({ message: error.message });
      else res.status(500).json({ message: error.message });
      console.log(error.toString());
    }
  });
  
module.exports = { router };
