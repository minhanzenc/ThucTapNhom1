const { default: mongoose } = require("mongoose")
const RoleGroupEnum = require("../enums/RoleGroupEnum")

const classRoomStudentSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: RoleGroupEnum
    },
    r_classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classroom"
    },
    r_student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
    },
})

const classroomstudent = mongoose.model("classroomstudent", classRoomStudentSchema)
module.exports = classroomstudent