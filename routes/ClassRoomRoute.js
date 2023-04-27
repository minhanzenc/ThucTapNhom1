const { Router } = require("express");
const router = Router({ mergeParams: true });
const classRoomServices = require("../services/ClassRoomServices");
const classRoomStudentServices = require("../services/ClassRoomStudentService");
const { CustomError } = require("../errors/CustomError");

const { default: mongoose } = require("mongoose");
const {
    createClassRoomDTO,
    deleteClassRoomDTO,
    updateClassRoomDTO,
} = require("../dtos/ClassRoomDTO");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");

router
    .get("/", verifyToken, authorize(["teacher"]), async (req, res) => {
        try {
            const { query } = req;
            let foundCLassRooms = await classRoomServices.getAll(req.user.id, query);
            const classRooms = await Promise.all(
                foundCLassRooms.classRooms.map(async (classRoom) => {
                    const students = await classRoomStudentServices.getByClassRoomId(
                        classRoom._id
                    );
          console.log(students);
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
  .get("/:id", verifyToken, authorize(["teacher"]), async (req, res) => {
    try {
      const { id } = req.params;
      const classRoom = await classRoomServices.getOneById(id);
      const students = await classRoomStudentServices.getByClassRoomId(
        classRoom._id
      );
      console.log("string", students);
      return res.status(200).json({ ...classRoom, students });
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post("/", verifyToken, authorize(["teacher"]), async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const classRoomDTO = createClassRoomDTO(req.body);

            if (classRoomDTO.hasOwnProperty("errMessage"))
                throw new CustomError(classRoomDTO.errMessage, 400);

            const createSubject = await classRoomServices.create(
                { ...classRoomDTO.data, r_teacher: req.user.id },
                session
            );
            await session.commitTransaction();
            res.status(201).json(createSubject);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            if (error instanceof CustomError)
                res.status(error.code).json({ message: error.message });
            else res.status(500).json({ message: error.message });
            console.error(error.toString());
        }
    })
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
                else res.status(500).json({ message: error.message });
                console.error(error.toString());
            } finally {
                session.endSession();
            }
        }
    );

module.exports = { router };
