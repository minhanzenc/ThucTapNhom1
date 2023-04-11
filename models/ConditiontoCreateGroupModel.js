const { default: mongoose } = require("mongoose");


const conditionSchema = new mongoose.Schema ({
    max:{
        type: Number,
        required: 'trường "Max" phải được truyền vào',
    },
    min:{
        type:Number,
        required:'trường "Min" phải được truyền vào',
    },
    r_subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"subject"
    }
})
const condition = mongoose.model("condition", conditionSchema);
module.exports = condition;
