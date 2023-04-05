const { default: mongoose } = require("mongoose")

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'trường "name" phải được truyền vào'
    },
    r_teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher"
    },
    r_subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"subject"
    }
})

const classroom = mongoose.model("classroom", subjectSchema)
module.exports = classroom