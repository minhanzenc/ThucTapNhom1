const { default: mongoose } = require("mongoose");

const discussSchema = new mongoose.Schema({
  message: {
    type: String,
    required: 'trường "message" phải được truyền vào',
  },
  r_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },
  r_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
  },
  r_account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
  },
});

const notification = mongoose.model("discuss", discussSchema);
module.exports = notification;
