const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'trường "name" phải được truyền vào',
  },
  r_teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
});

const subject = mongoose.model("subject", subjectSchema);
module.exports = subject;
