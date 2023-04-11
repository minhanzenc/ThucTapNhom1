const classRoom = require("../models/ClassRoomModel")

const create = ({ name,period, r_teacher,r_subject }, session) => {
    return classRoom.create([{ name,period, r_teacher,r_subject }], { session })
}
const deleteOne = (id,session) => {
    return classRoom.findByIdAndDelete(id,{session})
}
const getAll = () => {
    return classRoom.find({ active: true })
}
const updateOne = ({id,name,period,r_teacher,r_subject },session) => {
    return classRoom.findOneAndUpdate({ _id: id }, { name,period,r_teacher,r_subject }, { new: true }).session(session)
}
module.exports = { create,deleteOne,getAll,updateOne }
