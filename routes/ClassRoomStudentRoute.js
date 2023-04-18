const { Router } = require('express')
const router = Router({ mergeParams: true })
const classRoomStudentServices = require("../services/ClassRoomStudentService")
const { CustomError } = require("../errors/CustomError")

const { default: mongoose } = require('mongoose')
const { createClassRoomDTO, deleteClassRoomDTO, updateClassRoomDTO } = require('../dtos/ClassRoomDTO')
const { verifyToken, authorize } = require("../middlewares/VerifyToken")
const { validateArray } = require('../validation/validation')
const { createClassRoomStudentDto } = require('../dtos/ClassRoomStudentDTO')

router
    .post("/", verifyToken, authorize(["teacher", "admin"]), async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            if(validateArray(req.body))
                throw new CustomError('vui long truyen mang du lieu');
            
            let classRoomStudentDTOs = req.body.map(item => createClassRoomStudentDto(item));
            const foundError = classRoomStudentDTOs.find(item => item.hasOwnProperty("errMessage"));
            if (foundError)
                throw new CustomError(foundError.errMessage, 400)

            const createdClassRoomStudents = await classRoomStudentServices.createMany(classRoomStudentDTOs.map(item => item.data), session);

            await session.commitTransaction();
            res.status(201).json(createdClassRoomStudents)

        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            if (error instanceof CustomError)
                res.status(error.code).json({ message: error.message })
            else
                res.status(500).json({ message: error.message })
            console.error(error.toString())
        }

    })

module.exports = { router }