const { default: mongoose } = require("mongoose");

const conditionSchema = new mongoose.Schema({
  max: {
    type: Number,
    required: 'trường "Max" phải được truyền vào',
  },
  min: {
    type: Number,
    required: 'trường "Min" phải được truyền vào',
  },
  r_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },
});
const condition = mongoose.model("condition", conditionSchema);
module.exports = condition;
