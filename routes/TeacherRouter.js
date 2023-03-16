const { Router } = require('express')
const router = Router({ mergeParams: true })
const teacherService = require("../services/TeacherServices")
const { CustomError } = require("../errors/CustomError")

const { default: mongoose } = require('mongoose')
const { createTeacherDTO } = require('../dtos/TeacherDTO')
const { deleteTeacherDTO } = require('../dtos/TeacherDTO')

router
    .post("/", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const teacherDTO = createTeacherDTO(req.body);
            console.log(teacherDTO)
            if (teacherDTO.hasOwnProperty("errMessage"))
                throw new CustomError(teacherDTO.errMessage, 400)

            const createdTeacher = await teacherService.create(teacherDTO.data, session);

            await session.commitTransaction()
            res.status(201).json(createdTeacher)

        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            if (error instanceof CustomError)
                res.status(error.code).json({ message: error.message })
            else
                res.status(500).json("Server has something wrong!!") 
            console.error(error.toString())
        }

    })
    .delete("/:id",async (req,res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const teacherDTO = deleteTeacherDTO(req.params.id)
            if (teacherDTO.hasOwnProperty("errMessage"))
                throw new CustomError(teacherDTO.errMessage, 400)
            await teacherService.deleteOne(teacherDTO.data.id, session)
            await session.commitTransaction()
            res.status(201).json({message: "xoa thanh cong"})
        } catch (error) {
            await session.abortTransaction()
            session.endSession()

            if (error instanceof CustomError)
                res.status(error.code).json({ message: error.message })
            else
                res.status(500).json({message:"Server has something wrong!!"})
            console.error(error.toString())
        }
    })

module.exports = { router }