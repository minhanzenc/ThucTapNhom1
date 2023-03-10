const category = require("../models/CategoryModel")

const create = ({ name, img },session) => {
    return category.create([{ name, img }],{session})
}

const getAll = () => {
    return category.find({ active: true })
}

const getById = (id) => {
    return category.findById(id)
}

// const getWithPagination = (paginationOption) => {
//     return category.paginate({active:true},paginationOption)
// }

const getByName = (name) => {
    return category.findOne({ name })
}

const deleteOne = (id,session) => {
    return category.findOneAndUpdate({ _id: id }, { active: false }, { new: true }).session(session)
}

const updateOne = ({id, name, img },session) => {
    return category.findOneAndUpdate({ _id: id }, { name, img, updatedAt: new Date()}, { new: true }).session(session)
}

module.exports = { create, getByName, getAll,  deleteOne, updateOne, getById }
