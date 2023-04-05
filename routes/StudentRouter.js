const { Router } = require('express')
const router = Router({ mergeParams: true })
const studentService = require("../services/StudentServices")
const { CustomError } = require("../errors/CustomError")
const { default: mongoose } = require('mongoose')
const { createStudentDTO } = require('../dtos/StudentDTO')
const { deleteStudentDTO, updateStudentDTO } = require('../dtos/StudentDTO')
const { readFile } = require('../helpers/excel')
router
    .get("/", async (req, res) => {
        try {
            const student = await studentService.getAll()
            return res.status(200).json(student)
        } catch (error) {
            res.status(500).json(error)
        }
    })
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
    .post("/import-by-excel", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {

            const exxcelFile = req.files.excelFile.data;

            const creatingStudents = readFile(exxcelFile);
            console.log(creatingStudents)
            const createdStudent = await studentService.createMany(creatingStudents)

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
    .delete("/:id", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const studentDTO = deleteStudentDTO(req.params.id)
            if (studentDTO.hasOwnProperty("errMessage"))
                throw new CustomError(studentDTO.errMessage, 400)
            await studentService.deleteOne(studentDTO.data.id, session)
            await session.commitTransaction()
            res.status(201).json({ message: "xoa thanh cong" })
        } catch (error) {
            await session.abortTransaction()
            session.endSession()

            if (error instanceof CustomError)
                res.status(error.code).json({ message: error.message })
            else
                res.status(500).json({ message: "Server has something wrong!!" })
            console.error(error.toString())
        }
    })
    .put("/:id", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const studentDTO = updateStudentDTO(req.params.id, req.body)
            if (studentDTO.hasOwnProperty("errMessage"))
                throw new CustomError(studentDTO.errMessage, 400)
            const updatedStudent = await studentService.update({ ...studentDTO.data }, session)
            await session.commitTransaction()
            res.status(201).json(updatedStudent)

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
module.exports = { router }