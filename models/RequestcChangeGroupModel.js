const { RFC_2822 } = require("moment");
const { default: mongoose } = require("mongoose");

const requestSchema = new mongoose.Schema({
    newidgroup: {
        type: String,
        require: 'trường "NewIDGroup" phải được truyền vào',
    },
    status: {
        type: Boolean,
        require: 'trường "status" phải được chọn'
    },
    r_group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "group",
    },
    r_student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
    },
})

const request = mongoose.model("request", requestSchema);
module.exports = request;