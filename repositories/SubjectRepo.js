const subject = require("../models/SubjectModel")

const create = ({ name, r_teacher }, session) => {
    return subject.create([{ name, r_teacher }], { session })
}
const deleteOne = (id,session) => {
    return subject.findByIdAndDelete(id,{session})
}
const getAll = () => {
    return subject.find({ active: true })
}
const updateOne = ({id,name,r_account },session) => {
    return subject.findOneAndUpdate({ _id: id }, { name,r_account }, { new: true }).session(session)
}
module.exports = { create,deleteOne,getAll,updateOne }
