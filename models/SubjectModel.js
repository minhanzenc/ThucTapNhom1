const { default: mongoose } = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const subjectSchema = new mongoose.Schema({
  name:{
    type: String,
    required: 'trường "name" phải được truyền vào',
    unique: true,
  }
});
subjectSchema.plugin(uniqueValidator, {message: '{VALUE} đã bị trùng' })
const subject = mongoose.model("subject", subjectSchema);
module.exports = subject;
