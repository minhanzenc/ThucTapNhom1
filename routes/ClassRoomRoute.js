const { Router } = require("express");
const router = Router({ mergeParams: true });
const classRoomServices = require("../services/ClassRoomServices");
const classRoomStudentServices = require("../services/ClassRoomStudentService");
const groupStudentServices = require("../services/GroupStudentService");
const { CustomError } = require("../errors/CustomError");
const ConditionToCreateGroup = require("../models/ConditiontoCreateGroupModel");
const { default: mongoose } = require("mongoose");
const Teacher = require("../models/TeacherModel");
const {
  createClassRoomDTO,
  deleteClassRoomDTO,
  updateClassRoomDTO,
} = require("../dtos/ClassRoomDTO");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
const GroupService = require("../services/GroupService");

router
  .get("/", verifyToken, authorize(["teacher", "admin"]), async (req, res) => {
    const { user } = req;
    const teacherID = await Teacher.findOne({ r_account: user.id });
    try {
      const { query } = req;
      let foundCLassRooms = await classRoomServices.getAll(teacherID.id, query);
      const classRooms = await Promise.all(
        foundCLassRooms.classRooms.map(async (classRoom) => {
          const students = await classRoomStudentServices.getByClassRoomId(
            classRoom._id
          );
          console.log(students);
          return { ...classRoom, students };
        })
      );
      return res.status(200).json({ classRooms, total: foundCLassRooms.total });
    } catch (error) {
      console.log(error);
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
        const classRoom = await classRoomServices.getOneById(id);
        return res.status(200).json(classRoom);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  )
  // .get("/:id", verifyToken, authorize(["teacher"]), async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const classRoom = await classRoomServices.getOneById(id);
  //     const students = await classRoomStudentServices.getByClassRoomId(
  //       classRoom._id
  //     );
  //     console.log("string", students);
  //     console.log("string 2", classRoom);
  //     return res.status(200).json({ students });
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // })
  .get(
    "/student-classroom/:id",
    verifyToken,
    authorize(["teacher"]),
    async (req, res) => {
      try {
        const { id } = req.params;
        const classRoom = await classRoomServices.getOneById(id);
        const students = await classRoomStudentServices.getByClassRoomId(
          classRoom._id
        );
        return res.status(200).json({ students });
      } catch (error) {
        res.status(500).json(error);
      }
    }
  )
  .post("/", verifyToken, authorize(["teacher", "admin"]), async (req, res) => {
    const { user } = req;
    const teacherID = await Teacher.findOne({ r_account: user.id });
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const classRoomDTO = createClassRoomDTO(req.body);

      if (classRoomDTO.hasOwnProperty("errMessage"))
        throw new CustomError(classRoomDTO.errMessage, 400);

      const createSubject = await classRoomServices.create(
        { ...classRoomDTO.data, r_teacher: teacherID.id },
        session
      );
      const newCondition = new ConditionToCreateGroup({
        min: 1,
        max: 5,
        r_classroom: createSubject[0]._id,
      });
      await newCondition.save();
      await session.commitTransaction();
      res.status(201).json(createSubject);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof CustomError)
        res.status(error.code).json({ message: error.message });
      else if (11000 === error.code || 11001 === error.code) {
        res.status(400).json({
          message: error.message,
        });
      } else res.status(500).json({ message: "Tên lớp bị trùng với lớp khác trong môn này" });
      console.error(error.toString());
    }
  })
  // .delete(
  //   "/:id",
  //   verifyToken,
  //   authorize(["teacher", "admin"]),
  //   async (req, res) => {
  //     const session = await mongoose.startSession();
  //     session.startTransaction();
  //     try {
  //       const classRoomDTO = deleteClassRoomDTO(req.params.id);
  //       if (classRoomDTO.hasOwnProperty("errMessage"))
  //         throw new CustomError(classRoomDTO.errMessage, 400);
  //       await classRoomServices.deleteOne(classRoomDTO.data.id, session);
  //       await session.commitTransaction();
  //       res.status(201).json({ message: "xoa thanh cong" });
  //     } catch (error) {
  //       await session.abortTransaction();
  //       session.endSession();
  //       if (error instanceof CustomError)
  //         res.status(error.code).json({ message: error.message });
  //       else res.status(500).json({ message: error.message });
  //       console.error(error.toString());
  //     }
  //   }
  // )

  .delete(
    "/:id",
    verifyToken,
    authorize(["teacher", "admin"]),
    async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const classRoomDTO = deleteClassRoomDTO(req.params.id);
        if (classRoomDTO.hasOwnProperty("errMessage"))
          throw new CustomError(classRoomDTO.errMessage, 400);

        const classroomstudent =
          await classRoomStudentServices.getByClassRoomId(req.params.id);
        for (const student of classroomstudent) {
          await classRoomStudentServices.deleteOne(student._id);
        }
        await GroupService.deleteByClassRoomId(classRoomDTO.data.id, session);
        await classRoomServices.deleteOne(classRoomDTO.data.id, session);



        await session.commitTransaction();
        res.status(201).json({ message: "xoa thanh cong" });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error instanceof CustomError)
          res.status(error.code).json({ message: error.message });
        else res.status(500).json({ message: error.message });
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
        const classRoomDTO = updateClassRoomDTO(req.params.id, req.body);
        if (classRoomDTO.hasOwnProperty("errMessage"))
          throw new CustomError(classRoomDTO.errMessage, 400);
        const updatedSubject = await classRoomServices.update(
          { ...classRoomDTO.data, r_teacher: req.user.id },
          session
        );
        await session.commitTransaction();
        res.status(201).json(updatedSubject);
      } catch (error) {
        await session.abortTransaction();
        if (error instanceof CustomError)
          res.status(error.code).json({ message: error.message });
        else if (11000 === error.code || 11001 === error.code) {
          res.status(400).json({
            message: `Tên lớp bị trùng `,
          });
        } else res.status(500).json({ message: error.message });
        console.error(error.toString());
      } finally {
        session.endSession();
      }
    }
  );

module.exports = { router };
