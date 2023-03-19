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
  recipient_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const notification = mongoose.model("notification", notificationSchema);
module.exports = notification;
