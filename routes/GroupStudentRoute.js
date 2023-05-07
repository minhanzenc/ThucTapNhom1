const { Router, json } = require("express");
const router = Router({ mergeParams: true });
const groupStudentServices = require("../services/GroupStudentService");
const studentService = require("../services/StudentServices");
const groupService = require("../services/GroupService");
const { CustomError } = require("../errors/CustomError");

const { default: mongoose } = require("mongoose");
const {
  createGroupDTO,
  deleteGroupDTO,
  updateGroupDTO,
} = require("../dtos/GroupDTO");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
const { validateArray } = require("../validation/validation");
const {
  createGroupStudentDto,
  deleteGroupStudentDto,
} = require("../dtos/GroupStudentDTO");
const { checkGroupMax } = require("../middlewares/checkGroupMax");

router
  // .post("/", verifyToken, authorize(["teacher", "admin"]), async (req, res) => {
  //     const session = await mongoose.startSession()
  //     session.startTransaction()
  //     try {
  //         if (validateArray(req.body))
  //             throw new CustomError('vui long truyen mang du lieu');
  //         let groupStudentDTOs = req.body.map(item => createGroupStudentDto(item));
  //         const foundError = groupStudentDTOs.find(item => item.hasOwnProperty("errMessage"));
  //         if (foundError)
  //             throw new CustomError(foundError.errMessage, 400)

  //         const createdGroupStudents = await groupStudentServices.createMany(groupStudentDTOs.map(item => item.data), session);

  //         await session.commitTransaction();
  //         res.status(201).json(createdGroupStudents)

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
  .post(
    "/",
    checkGroupMax,
    verifyToken,
    authorize(["teacher", "admin"]),
    async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const groupStudentDTO = createGroupStudentDto(req.body);
        if (groupStudentDTO.hasOwnProperty("errMessage"))
          throw new CustomError(groupStudentDTO.errMessage, 400);
        const createGroupStudent = await groupStudentServices.create(
          groupStudentDTO.data,
          session
        );
        await session.commitTransaction();
        res.status(201).json(createGroupStudent);
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error instanceof CustomError)
          res.status(error.code).json({ message: error.message });
        if (11000 === error.code || 11001 === error.code) {
          const student = await studentService.getOneById(req.body.r_student);
          const groupstudent = await groupStudentServices.getByStudentId(req.body.r_student);
          if (groupstudent.r_group == req.body.r_group) {
            res.status(400).json({
              message: `Sinh viên ${student.firstName} ${student.lastName} đã tồn tại trong group khác`,
            });
          }
          const group = await groupService.getOneById(req.body.r_group);
          res.status(400).json({
            message: `Sinh viên ${student.firstName} ${student.lastName} đã tồn tại trong group`,
          });
        } else res.status(500).json({ message: error.message });
        console.error(error.toString());
      }
    }
  )
  .delete("/:id", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const groupStudentDTOs = deleteGroupDTO(req.params.id);
      if (groupStudentDTOs.hasOwnProperty("errMessage"))
        throw new CustomError(groupStudentDTOs.errMessage, 400);
      await groupStudentServices.deleteOne(groupStudentDTOs.data.id, session);
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
