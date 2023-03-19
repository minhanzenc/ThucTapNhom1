const RoleStudentEnums = require("../enums/RoleStudentEnums");
const mongoose = require("mongoose");
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
  r_subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
  },
});

const groupstudent = mongoose.model("groupstudent", groupstudentSchema);
module.exports = groupstudent;
