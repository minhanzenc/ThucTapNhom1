const student = require("../models/StudentModel")

const create = ({ lastName, firstName, classRoom, phone, email, r_account }, session) => {
    return student.create([{ lastName, firstName, classRoom, phone, email, r_account }], { session })
}
const createMany = (students, session) => {
    return student.insertMany(students, {session})
}

const deleteOne = (id, session) => {
    return student.findByIdAndDelete(id, { session })
}
const getAll = () => {
    return student.find({ active: true })
}
const updateOne = ({ id, lastName, firstName, phone, classRoom, email }, session) => {
    return student.findOneAndUpdate({ _id: id }, { lastName, firstName, phone, classRoom, email }, { new: true }).session(session)
}

module.exports = { create, deleteOne, getAll, updateOne, createMany }
