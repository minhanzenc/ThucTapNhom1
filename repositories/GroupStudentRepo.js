const { default: mongoose } = require("mongoose")
const groupStudent = require("../models/GroupStudentModel")

const createMany = (groupStudents, session) => {
    return groupStudent.insertMany(groupStudents, { session })
}
const create=({ role, r_group, r_student,r_classroom },session)=>{
    return groupStudent.create([{ role, r_group, r_student,r_classroom}],{session})
}
// const getAll = (teacherId) => {
//     return groupStudent.find({ active: true, r_teacher: teacherId})
// }
const getByGroupId = (groupId) => {
    return groupStudent.find({r_group: groupId}).populate('r_student')
}
const getByStudentId=(idStudent)=>{
    return groupStudent.find({r_student:idStudent})
}
const deleteOne = (id,session) => {
    return groupStudent.findByIdAndDelete(id,{session})
}
module.exports = {getByGroupId, createMany ,getByStudentId,deleteOne,create}
