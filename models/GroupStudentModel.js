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
  r_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },
});
groupstudentSchema.pre("save", async function (next) {
  const existingLeader = await this.constructor.findOne({
    r_group: this.r_group,
    role: "leader",
  });

  if (this.role === "leader" && existingLeader) {
    this.role = "member";
  }

  next();
});
const groupstudent = mongoose.model("groupstudent", groupstudentSchema);
module.exports = groupstudent;
