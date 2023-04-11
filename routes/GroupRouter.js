const express = require("express");
const router = express.Router();
const Group = require("../models/GroupModel");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const Subject = require("../models/SubjectModel");
const GroupStudent = require("../models/GroupStudentModel");
const CustomError = require("../errors/CustomError");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
const GroupService = require("../services/GroupService");

//LAY TAT CA NHOM THUOC MON HOC
//TRUYEN MA MON HOC
router.get("/:r_subject", verifyToken, async (req, res) => {
  const { r_subject } = req.params;
  console.log("r_subject ", r_subject);
  try {
    const groups = await Group.find({ r_subject });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TAO GROUP .TRUYEN TEN NHOM VOI R_SUBJECT
router.post("/", verifyToken, async (req, res) => {
  const { name, r_subject } = req.body;

  try {
    // Kiểm tra r_subject có tồn tại trong SubjectModel không
    const subject = await Subject.findById(r_subject);
    if (!subject) {
      return res.status(400).json({ message: "r_subject không hợp lệ" });
    }

    const newGroup = new Group({ name, r_subject });
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
router.post("/students/:groupId", verifyToken, async (req, res) => {
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
      r_subject: group.r_subject,
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
module.exports = { router };

//them studen vao nhom router.post('/:groupId/students', async (req, res) => {
