const { default: mongoose } = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'trường "name" phải được truyền vào',
  },
  r_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },
});

const group = mongoose.model("group", groupSchema);
module.exports = group;
