const { default: mongoose } = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'trường "name" phải được truyền vào',
  },
});

const subject = mongoose.model("subject", subjectSchema);
module.exports = subject;
