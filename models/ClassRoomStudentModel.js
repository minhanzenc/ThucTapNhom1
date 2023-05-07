const { default: mongoose } = require("mongoose");
const RoleGroupEnum = require("../enums/RoleGroupEnum");

const classRoomStudentSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: RoleGroupEnum,
  },
  r_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },

  r_student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
});
classRoomStudentSchema.pre("save", async function (next) {
  const existingLeader = await this.constructor.findOne({
    r_group: this.r_group,
    role: "class_monitor",
  });

  if (this.role === "class_monitor" && existingLeader) {
    this.role = "member";
  }

  next();
});
classRoomStudentSchema.index(
  { r_classroom: 1, r_student: 1 },
  { unique: true }
);
const classroomstudent = mongoose.model(
  "classroomstudent",
  classRoomStudentSchema
);
module.exports = classroomstudent;
