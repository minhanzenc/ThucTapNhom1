const { default: mongoose } = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'trường "name" phải được truyền vào',
  },
  r_subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
  },
});

const group = mongoose.model("group", groupSchema);
module.exports = group;
