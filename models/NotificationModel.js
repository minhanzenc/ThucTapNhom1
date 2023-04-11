const { default: mongoose } = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'trường "title" phải được truyền vào',
  },
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
  r_subject: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"subject"
  },
});

const notification = mongoose.model("notification", notificationSchema);
module.exports = notification;
