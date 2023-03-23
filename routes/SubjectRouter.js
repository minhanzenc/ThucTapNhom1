const { Router } = require('express')
const router = Router({ mergeParams: true })
const subjectService = require("../services/SubjectServices")
const { CustomError } = require("../errors/CustomError")

const { default: mongoose } = require('mongoose')
const { createSubjectDTO } = require('../dtos/SubjectDTO')
const { deleteSubjectDTO,updateSubjectDTO } = require('../dtos/SubjectDTO')

router
    .get("/", async (req, res) => {
        try {
            const subject = await subjectService.getAll()
            return res.status(200).json(subject)
        } catch (error) {
            res.status(500).json(error)
        }
    })
    .post("/", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const subjectDTO = createSubjectDTO(req.body);

            if (subjectDTO.hasOwnProperty("errMessage"))
                throw new CustomError(subjectDTO.errMessage, 400)

            const createSubject = await subjectService.create(subjectDTO.data, session);

            await session.commitTransaction()
            res.status(201).json(createSubject)

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
            const subjectDTO = deleteSubjectDTO(req.params.id)
            if (subjectDTO.hasOwnProperty("errMessage"))
                throw new CustomError(subjectDTO.errMessage, 400)
            await subjectService.deleteOne(subjectDTO.data.id, session)
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
    .put("/:id", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const subjectDTO = updateSubjectDTO(req.params.id,req.body)
            if (subjectDTO.hasOwnProperty("errMessage"))
                throw new CustomError(subjectDTO.errMessage, 400)
            const updatedSubject = await subjectService.update({...subjectDTO.data}, session)
            await session.commitTransaction()
            res.status(201).json(updatedSubject)

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