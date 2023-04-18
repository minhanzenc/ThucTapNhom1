const classRoom = require("../models/ClassRoomModel")

const create = ({ name,period, r_teacher,r_subject }, session) => {
    return classRoom.create([{ name,period, r_teacher,r_subject }], { session })
}
const deleteOne = (id,session) => {
    return classRoom.findByIdAndDelete(id,{session})
}
const getAll = (teacherId) => {
    return classRoom.find({ active: true, r_teacher: teacherId})
}
const getByTeacherId = (teacherId) => {
    return classRoom.find({ 
        r_teacher: teacherId
     })
}
const getBySubjectId=(subjectId)=>{
    return classRoom.find({
        r_subject:subjectId
    })
}
const updateOne = ({id,name,period,r_teacher,r_subject },session) => {
    return classRoom.findOneAndUpdate({ _id: id }, { name,period,r_teacher,r_subject }, { new: true }).session(session)
}
module.exports = { create,deleteOne,getAll,updateOne, getByTeacherId,getBySubjectId }
