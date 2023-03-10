const { Router } = require('express')
const router = Router({ mergeParams: true })
const categoryService = require("../services/CategoryService")
const { createCategoryDto, updateCategoryDto, deleteCategoryDto } = require("../dtos/CategoryDTO")
const { CustomError } = require("../errors/CustomError")

const { default: mongoose } = require('mongoose')

router
    .post("/", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            let img = ""
            if(req.file !== null && req.file !== undefined)
                img = req.file.filename
            const categoryDTO = createCategoryDto({...req.body, img})
            if (categoryDTO.hasOwnProperty("errMessage"))
                throw new CustomError(categoryDTO.errMessage, 400)
            const createdCategory = await categoryService.create({...categoryDTO.data}, session)

            await session.commitTransaction()
            res.status(201).json(createdCategory[0])

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
    .put("/:id", async (req, res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            let img = ""
            if(req.file !== null && req.file !== undefined)
                img = req.file.filename
            const categoryDTO = updateCategoryDto(req.params.id,{...req.body, img})
            if (categoryDTO.hasOwnProperty("errMessage"))
                throw new CustomError(categoryDTO.errMessage, 400)
            const updatedCategory = await categoryService.update({...categoryDTO.data}, session)
            await session.commitTransaction()
            res.status(201).json(updatedCategory)

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
    .get("/", async (req, res) => {
        try {
            const categories = await categoryService.getAll()
            return res.status(200).json(categories)
        } catch (error) {
            res.status(500).json(error)
        }
    })
    .delete("/:id",async (req,res) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const categoryDTO = deleteCategoryDto(req.params.id)
            if (categoryDTO.hasOwnProperty("errMessage"))
                throw new CustomError(categoryDTO.errMessage, 400)
            await categoryService.deleteOne(categoryDTO.data.id, session)
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