const { default: mongoose } = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'trường "firstName" phải được truyền vào',
  },
  lastName: {
    type: String,
    required: 'trường "lastName" phải được truyền vào',
  },
  phone: {
    type: String,
    required: 'trường "phone" phải được truyền vào',
    unique: true,
  },
  email: {
    type: String,
    required: 'trường "email" phải được truyền vào',
    unique: true,
  },
  r_account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
  },
});
teacherSchema.plugin(uniqueValidator, {message: '{VALUE} đã bị trùng' })
const teacher = mongoose.model("teacher", teacherSchema);
module.exports = teacher;
