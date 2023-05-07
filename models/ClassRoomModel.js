const { default: mongoose } = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const classRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'trường "name" phải được truyền vào',
    unique: true,
  },
  period: {
    type: String,
    required: 'trường "Ca học" phải được truyền vào',
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
classRoomSchema.plugin(uniqueValidator, { message: "{VALUE} đã bị trùng" });
const classroom = mongoose.model("classroom", classRoomSchema);
module.exports = classroom;
