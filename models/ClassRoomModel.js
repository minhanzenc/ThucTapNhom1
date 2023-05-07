const { default: mongoose } = require("mongoose");

const classRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'trường "name" phải được truyền vào',
  },
  period: {
    type: String,
    required: 'trường "Ca học" phải được truyền vào',
  },
  time:{
    type:String,
    required: 'trường "thời gian" phải được truyền vào',
  },
  r_teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
  r_subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
  },
});

const classroom = mongoose.model("classroom", classRoomSchema);
module.exports = classroom;
