const subject = require("../models/SubjectModel")

const create = ({ name }, session) => {
    return subject.create(
        [
            { name }
        ],
        { session }
    )
}
const getAll = () => {
    return subject.find({})
}
const deleteOne = (id, session) => {
    return subject.findByIdAndDelete(id, session)
}
const updateOne = ({ id, name }, session) => {
    return subject.findByIdAndUpdate({ _id: id }, { name },{new:true,session})
}
module.exports = { create, getAll, deleteOne, updateOne }