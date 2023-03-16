const subject = require("../models/SubjectModel")

const create = ({ name, r_teacher }, session) => {
    return subject.create([{ name, r_teacher }], { session })
}
const deleteOne = (id,session) => {
    return subject.findByIdAndDelete(id,{session})
}
module.exports = { create,deleteOne }
