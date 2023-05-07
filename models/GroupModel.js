const { default: mongoose } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'trường "name" phải được truyền vào',
    required: true,
  },
  r_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
    required: true,
  },
  r_teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
});
groupSchema.index({ r_classroom: 1, name: 1 }, { unique: true });
groupSchema.plugin(uniqueValidator, { message: "{VALUE} đã bị trùng" });
const group = mongoose.model("group", groupSchema);
module.exports = group;
