const { default: mongoose } = require("mongoose");
const RoleStudentEnums = require("../enums/RoleStudentEnums");

const groupStudentSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: RoleStudentEnums,
  },
  r_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    required: true,
  },
  r_student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  r_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
    required: true,
  },
});

groupStudentSchema.pre("save", async function (next) {
  const existingLeader = await this.constructor.findOne({
    r_group: this.r_group,
    role: "leader",
  });

  if (this.role === "leader" && existingLeader) {
    this.role = "member";
  }

  next();
});

groupStudentSchema.index({ r_group: 1, r_student: 1 }, { unique: true });
groupStudentSchema.index({ r_classroom: 1, r_student: 1 }, { unique: true });
const groupstudent = mongoose.model("groupstudent", groupStudentSchema);
module.exports = groupstudent;
