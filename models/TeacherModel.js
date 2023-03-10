const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'trường "firstName" phải được truyền vào'
    },
    lastName: {
        type: String,
        required: 'trường "lastName" phải được truyền vào'
    },
    phone: {
        type: String,
        required: 'trường "phone" phải được truyền vào',
        unique:true
    },
    email: {
        type: String,
        required: 'trường "email" phải được truyền vào',
        unique:true
    },
    r_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher"
    },
})

const teacher = mongoose.model("teacher", teacherSchema)
module.exports = teacher