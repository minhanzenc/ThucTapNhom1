const { default: mongoose } = require("mongoose");
const RoleEnums = require("../enums/RoleEnums");

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'trường "email" phải được truyền vào',
  },
  password: {
    type: String,
    required: 'trường "password" phải được truyền vào',
  },
  role: {
    type: String,
    enum: RoleEnums,
  },
});

const account = mongoose.model("account", accountSchema);
module.exports = account;
