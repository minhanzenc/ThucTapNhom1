const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'trường "firstName" phải được truyền vào',
  },
  lastName: {
    type: String,
    required: 'trường "lastName" phải được truyền vào',
  },
  idStudent:{
    type:String,
    require :'trường "ID Student" phải được truyền vào',
    unique: "Mã SV không được trùng",
  },
  classRoom: {
    type: String,
    required: 'trường "class" phải được truyền vào',
  },
  phone: {
    type: String,
    required: 'trường "phone" phải được truyền vào',
    unique: 'Số điện thoại đã bị trùng vui lòng thử lại ',
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

const student = mongoose.model("student", studentSchema);
module.exports = student;
