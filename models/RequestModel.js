const { default: mongoose } = require("mongoose");

const requestSchema = new mongoose.Schema({
  message: {
    type: String,
    required: 'trường "message" phải được truyền vào',
  },
  r_student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  r_teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
  r_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
  },
  r_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },
  status: {
    type: Boolean,
    required: 'trường "status" phải được truyền vào',
  },
  recipient_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
  },
});

const request = mongoose.model("request", requestSchema);
module.exports = request;
