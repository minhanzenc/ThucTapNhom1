const { default: mongoose } = require("mongoose");

const dissusSchema = new mongoose.Schema({
    message: {
        type: String,
        required: 'trường "name" phải được truyền vào',
    }
})

const disscus = mongoose.model("disscus", dissusSchema);
module.exports = disscus;
