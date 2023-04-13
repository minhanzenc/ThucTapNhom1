const { Router } = require('express')
const router = Router({ mergeParams: true })
const teacherService = require("../services/TeacherServices")
const classRoomServices = require("../services/ClassRoomServices")
const { CustomError } = require("../errors/CustomError")
const accountService = require('../services/AccountService')
const { default: mongoose } = require('mongoose')
const { createTeacherDTO, updateTeacherDTO } = require('../dtos/TeacherDTO')
const { deleteTeacherDTO } = require('../dtos/TeacherDTO')
const { v4: uuidv4 } = require('uuid');
router
    .get("/", async (req, res) => {
        try {
            const teacher = await teacherService.getAll()
            return res.status(200).json(teacher)
        } catch (error) {
            res.status(500).json(error)
        }
    })
    .post("/", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const teacherDTO = createTeacherDTO(req.body);
            if (teacherDTO.hasOwnProperty("errMessage"))
                throw new CustomError(teacherDTO.errMessage, 400)
            const createdAccount = await accountService.create({
                email: teacherDTO.data.email,
                password: uuidv4(),
                role: "teacher"
            }, session)
            const createdTeacher = await teacherService.create({ ...teacherDTO.data,  r_account: createdAccount[0]._id }, session);
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
    .delete("/:id", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const check = await classRoomServices.getByTeacherId(req.params.id)
            if (check.length > 0) {
                throw new CustomError("Không xóa được vì có tồn tại trong classroom", 400)
            }
            const teacherDTO = deleteTeacherDTO(req.params.id)
            if (teacherDTO.hasOwnProperty("errMessage"))
                throw new CustomError(teacherDTO.errMessage, 400)
            await teacherService.deleteOne(teacherDTO.data.id, session)
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
            const teacherDTO = updateTeacherDTO(req.params.id, req.body)
            if (teacherDTO.hasOwnProperty("errMessage"))
                throw new CustomError(teacherDTO.errMessage, 400)
            const updatedTeacher = await teacherService.update({ ...teacherDTO.data }, session)
            await session.commitTransaction()
            res.status(201).json(updatedTeacher)

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