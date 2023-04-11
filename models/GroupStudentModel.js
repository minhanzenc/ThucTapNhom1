const { default: mongoose } = require("mongoose");
const RoleStudentEnums = require("../enums/RoleStudentEnums");

const groupstudentSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: RoleStudentEnums,
  },
  r_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
  },
  r_student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
});

const groupstudent = mongoose.model("groupstudent", groupstudentSchema);
module.exports = groupstudent;
