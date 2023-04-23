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
const ConditionToCreateGroup = require("../models/ConditiontoCreateGroupModel");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");

const GroupService = require("../services/GroupService");
const { checkGroupMax } = require("../middlewares/checkGroupMax");

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
    const newCondition = new ConditionToCreateGroup({
      min: 1,
      max: 5,
      r_classroom,
    });
    await newCondition.save();
    const newGroup = new Group({ name, r_classroom });
    await newGroup.save();

    res.json(newGroup);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

//them dieu kien min, max
router.put("/conditionToCreateGroup", verifyToken, async (req, res) => {
  const { max, min = 1, r_classroom } = req.body;

  try {
    // Kiểm tra r_classroom có tồn tại trong SubjectModel không
    const classroom = await ClassRoom.findById(r_classroom);
    if (!classroom) {
      return res.status(400).json({ message: "r_classroom không hợp lệ" });
    }

    const newCondition = new ConditionToCreateGroup.findOne({ r_classroom });
    newCondition.min = min;
    newCondition.max = max;
    await newCondition.save();

    res.json(newCondition);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

//lay  dieu kien min max cua group
router.get("/conditionToCreateGroup/:r_classroom", async (req, res) => {
  const { r_classroom } = req.params;
  try {
    const conditions = await ConditionToCreateGroup.find({ r_classroom });
    res.json(conditions);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

//THEM tung SINH VIEN VAO NHOM
//TRUYEN MA SINH VIEN VAO
router.post("/students/", checkGroupMax, verifyToken, async (req, res) => {
  try {
    const group = req.group;
    // console.log("student id ", req.body.r_student);
    // const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    // const condition = await ConditionToCreateGroup.find({
    //   r_classroom: group.r_classroom,
    // });
    // console.log("condition max", condition[0].max);

    // const countGroupStudents = await GroupStudent.countDocuments({
    //   r_group: group._id,
    // });
    // console.log("count ", countGroupStudents);
    // if (countGroupStudents >= condition[0].max) {
    //   return res
    //     .status(400)
    //     .json({ error: "Group has reached maximum number of students" });
    // }
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

//them hang loat sinh vien vao nhom
// [
//   {
//     "role": "LEADER",
//     "r_group": "604f6ebd7f6751a741508c3a",
//     "r_student": "604f6ebd7f6751a741508c3b",
//     "r_classroom": "604f6ebd7f6751a741508c3c"
//   },
//   {
//     "role": "MEMBER",
//     "r_group": "604f6ebd7f6751a741508c3a",
//     "r_student": "604f6ebd7f6751a741508c3d",
//     "r_classroom": "604f6ebd7f6751a741508c3c"
//   }
// ]
router.post("/multipleInsertStudent", async (req, res) => {
  const data = req.body;

  try {
    const condition = await ConditionToCreateGroup.findOne({
      r_classroom: data[0].r_classroom,
    });
    const count = await GroupStudent.countDocuments({
      r_group: data[0].r_group,
    });

    if (count + data.length > condition.max) {
      res
        .status(400)
        .send(`Số lượng bản ghi vượt quá giới hạn (${condition.max})`);
      return;
    }
    const newRecords = await GroupStudent.insertMany(data);
    res.json(newRecords);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
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

//lay tat ca nhom va sinh vien co trong nhom
router.get("/groups-with-students", async (req, res) => {
  try {
    const groups = await Group.find();
    const students = await GroupStudent.find().populate("r_student");

    const groupStudentList = groups.map((group) => {
      const studentsInGroup = students.filter(
        (student) => student.r_group == group.id
      );

      return { group, students: studentsInGroup };
    });

    res.json(groupStudentList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
