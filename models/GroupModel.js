const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'trường "name" phải được truyền vào'
    },
})

const group = mongoose.model("group", groupSchema)
module.exports = group