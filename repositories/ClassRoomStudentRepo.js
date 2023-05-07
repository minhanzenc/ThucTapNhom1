const { default: mongoose } = require("mongoose")
const classRoomStudent = require("../models/ClassRoomStudentModel")

const createMany = (classRoomStudents, session) => {
    return classRoomStudent.insertMany(classRoomStudents, { session })
}
const create=({ role, r_classroom, r_student },session)=>{
    return classRoomStudent.create([{ role, r_classroom, r_student }],{session})
}
// const getAll = (teacherId) => {
//     return classRoomStudent.find({ active: true, r_teacher: teacherId})
// }
const getByClassRoomId = (classRoomId) => {
    return classRoomStudent.find({r_classroom: classRoomId}).populate('r_student')
}
const getByStudentId=(idStudent)=>{
    return classRoomStudent.find({r_student:idStudent})
}
const getOneById = (id) => {
    return classRoomStudent.findById({ _id: id, active: true });
  };
const deleteOne = (id,session) => {
    return classRoomStudent.findByIdAndDelete(id,{session})
}
module.exports = {getOneById,getByClassRoomId, createMany ,getByStudentId,deleteOne,create}
