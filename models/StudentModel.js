const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'trường "firstName" phải được truyền vào',
  },
  lastName: {
    type: String,
    required: 'trường "lastName" phải được truyền vào',
  },
  idStudent: {
    type: String,
    require: 'trường "ID Student" phải được truyền vào',
    unique: true,
  },
  classRoom: {
    type: String,
    required: 'trường "class" phải được truyền vào',
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
studentSchema.plugin(uniqueValidator, {message: '{VALUE} đã bị trùng' })
const student = mongoose.model("student", studentSchema);
module.exports = student;
