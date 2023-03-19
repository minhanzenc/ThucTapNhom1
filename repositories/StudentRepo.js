const student = require("../models/StudentModel")

const create = ({ lastName,firstName,classRoom,phone,email, r_account }, session) => {
    return student.create([{ lastName,firstName,classRoom,phone,email, r_account }], { session })
}
const deleteOne = (id,session) => {
    return student.findByIdAndDelete(id,{session})
}
module.exports = { create,deleteOne }
