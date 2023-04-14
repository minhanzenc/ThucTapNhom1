const express = require("express");
const router = express.Router();
const Group = require("../models/GroupModel");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const Subject = require("../models/SubjectModel");
const GroupStudent = require("../models/GroupStudentModel");
const ClassRoom = require("../models/ClassRoomModel");
const CustomError = require("../errors/CustomError");
const Request = require("../models/RequestModel");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");

const GroupService = require("../services/GroupService");

//LAY TAT CA NHOM THUOC MON HOC
//TRUYEN MA MON HOC
router.get("/classroom/:r_classroom", verifyToken, async (req, res) => {
  const { r_classroom } = req.params;
  console.log("r_classroom ", r_classroom);
  try {
    const groups = await Group.find({ r_classroom });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TAO GROUP .TRUYEN TEN NHOM VOI R_classroom
router.post("/", verifyToken, async (req, res) => {
  const { name, r_classroom } = req.body;

  try {
    // Kiểm tra r_classroom có tồn tại trong SubjectModel không
    const classroom = await ClassRoom.findById(r_classroom);
    if (!classroom) {
      return res.status(400).json({ message: "r_classroom không hợp lệ" });
    }

    const newGroup = new Group({ name, r_classroom });
    await newGroup.save();

    res.json(newGroup);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});
//XOA GROUP TRUYEN ID VAO
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Không tìm thấy group" });
    }

    await Group.findByIdAndRemove(id);

    res.json({ message: "Xóa group thành công" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

//THEM SINH VIEN VAO NHOM
//TRUYEN MA SINH VIEN VAO
router.post("/students/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    console.log("student id ", req.body.r_student);
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    console.log("group id: ", group);
    const groupStudent = new GroupStudent({
      r_group: group._id,
      r_student: req.body.r_student,
      r_classroom: group.r_classroom,
      role: "member",
    });
    await groupStudent.save();

    res
      .status(201)
      .json({ message: "Student added to group", group: groupStudent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// Lấy tất cả sinh viên có trong nhóm

router.get("/students/:groupId", async (req, res) => {
  try {
    const groupStudents = await GroupStudent.find({
      r_group: req.params.groupId,
    });
    const group = await Group.findById(req.params.groupId).populate(
      "r_classroom"
    );
    const studentIds = groupStudents.map(
      (groupStudent) => groupStudent.r_student
    );
    const students = await Student.find({ _id: { $in: studentIds } });
    res.status(200).send({ students, group });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Xoa studen khỏi nhom
router.delete("/DeleteStudents/:studentId", async (req, res) => {
  const groupId = req.body.r_groupId;
  const studentId = req.params.studentId;

  try {
    const groupStudent = await GroupStudent.findOneAndUpdate(
      { r_group: groupId, r_student: studentId },
      { $unset: { r_student: 1 } },
      { new: true }
    );
    if (!groupStudent) {
      return res
        .status(404)
        .send({ message: "Không tìm thấy sinh viên trong nhóm này" });
    }
    return res
      .status(200)
      .send({ message: "Xóa sinh viên khỏi nhóm thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi xóa sinh viên khỏi nhóm" });
  }
});
// gửi request cho giao vien

module.exports = { router };
