const { Router } = require("express");
const router = Router({ mergeParams: true });
const { CustomError } = require("../errors/CustomError");
const subjectServices = require("../services/SubjectService");
const classRoomStudentServices = require("../services/ClassRoomStudentService");
const classRoomServices = require("../services/ClassRoomServices");
const accountServices = require("../services/ClassRoomServices");
const { default: mongoose } = require("mongoose");
const {
  createSubjectDTO,
  deleteSubjectDTO,
  updateSubjectDTO,
} = require("../dtos/SubjectDTO");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
router
  .get("/", verifyToken, authorize(["admin"]), async (req, res) => {
    try {
      const { query } = req;
      const subject = await subjectServices.getAll(query);
      return res.status(200).json(subject);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/:id", verifyToken, authorize(["admin"]), async (req, res) => {
    try {
      const { id } = req.params;
      const subject = await subjectServices.getOneById(id);
      return res.status(200).json(subject);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post("/", verifyToken, authorize(["admin"]), async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const subjectDTO = createSubjectDTO(req.body);
      if (subjectDTO.hasOwnProperty("errMessage"))
        throw new CustomError(subjectDTO.errMessage, 400);
      const createdSubject = await subjectServices.create(
        subjectDTO.data,
        session
      );
      await session.commitTransaction();
      res.status(201).json(createdSubject);
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
      // const check=classRoomServices.getBySubjectId(req.params.id)
      // if(check.length>0)
      // {
      //     // throw new CustomError("Không xóa được vì có tồn tại trong classroom", 400)
      //     await classRoomServices.deleteOne(subjectDTO.data.id,session)
      // }
      const subjectDTO = deleteSubjectDTO(req.params.id);
      if (subjectDTO.hasOwnProperty("errMessage"))
        throw new CustomError(subjectDTO.errMessage, 400);
      const classrooms = await classRoomServices.getBySubjectId(req.params.id);
      console.log(classrooms);
      for (const classroom of classrooms) {
        const classroomstudent =
          await classRoomStudentServices.getByClassRoomId(classroom._id);
        for (const student of classroomstudent) {
          await classRoomStudentServices.deleteOne(student._id);
        }
        await classRoomServices.deleteOne(classroom._id, session);
      }
      await subjectServices.deleteOne(subjectDTO.data.id, session);
      await session.commitTransaction();
      res.status(201).json({ message: "xóa thành công" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: error.message });

      console.log(error.toString);
    }
  })
  .put("/:id", verifyToken, authorize(["admin"]), async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const subjectDTO = updateSubjectDTO(req.params.id, req.body);
      if (subjectDTO.hasOwnProperty("errMessage"))
        throw new CustomError(subjectDTO.errMessage, 400);
      const updateSubject = await subjectServices.updateOne(
        subjectDTO.data,
        session
      );
      await session.commitTransaction();
      res.status(201).json(updateSubject);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else res.status(500).json({ message: error.message });
      console.error(error.toString());
    }
  });
module.exports = { router };
