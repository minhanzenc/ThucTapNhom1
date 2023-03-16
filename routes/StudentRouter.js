const { Router } = require('express')
const router = Router({ mergeParams: true })
const studentService = require("../services/StudentServices")
const { CustomError } = require("../errors/CustomError")

const { default: mongoose } = require('mongoose')
const { createStudentDTO } = require('../dtos/StudentDTO')
const { deleteStudentDTO } = require('../dtos/StudentDTO')
router
    .post("/", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const studentDTO = createStudentDTO(req.body);
            console.log(studentDTO)
            if (studentDTO.hasOwnProperty("errMessage"))
                throw new CustomError(studentDTO.errMessage, 400)

            const createdStudent = await studentService.create(studentDTO.data, session);

            await session.commitTransaction()
            res.status(201).json(createdStudent)

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
            const studentDTO = deleteStudentDTO(req.params.id)
            if (studentDTO.hasOwnProperty("errMessage"))
                throw new CustomError(studentDTO.errMessage, 400)
            await studentService.deleteOne(studentDTO.data.id, session)
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