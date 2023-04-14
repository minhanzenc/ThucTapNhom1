const express = require("express");
const router = express.Router();
const Group = require("../models/GroupModel");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const Subject = require("../models/SubjectModel");
const GroupStudent = require("../models/GroupStudentModel");
const CustomError = require("../errors/CustomError");
const Request = require("../models/RequestModel");

const GroupService = require("../services/GroupService");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
// gửi request cho giao vien
router.post("/", async (req, res) => {
  try {
    const groupId = req.body.recipient_group;
    console.log("student id ", req.body.r_student);
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    console.log("group id: ", group);
    const request = new Request({
      message: req.body.message,
      r_student: req.body.r_student,
      r_teacher: req.body.r_teacher,
      r_group: req.body.r_group,
      status: false, // false la yeu cau doi nhom chua dc chap thuan
      recipient_group: req.body.recipient_group,
    });
    await request.save();

    res.status(201).json({
      message: "Request created successfully",
      CreateRequest: request,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

//lay tat cac request gui den giao vien
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const requests = await Request.find({ r_teacher: id }).populate([
      "r_student",
      "r_teacher",
      "r_group",
      "recipient_group",
    ]);

    const formattedRequests = requests.map((request) => {
      return {
        r_student: request.r_student,
        r_teacher: request.r_teacher,
        NhomHienTai: request.r_group,
        status: request.status,
        NhomHMuonChuyen: request.recipient_group,
        _id: request._id,
      };
    });
    res.json(formattedRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//giao vien xoa request
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRequest = await Request.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).send(`Yêu cầu có id ${id} không tồn tại`);
    }
    res.send(`Đã xóa yêu cầu có id ${id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/update-groupstudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).send({
        message: "Không tìm thấy request",
      });
    }
    const groupStudent = await GroupStudent.findOne({
      r_group: request.r_group,
      r_student: request.r_student,
    });
    if (!groupStudent) {
      return res.status(404).send({
        message:
          "Không tìm thấy GroupStudentModel với r_group và r_student được cung cấp",
      });
    }
    // Cập nhật r_group của GroupStudentModel
    request.status = true;
    groupStudent.r_group = request.recipient_group;
    await groupStudent.save();
    await request.save();

    res.send({
      message: "Cập nhật thành công r_group của GroupStudentModel",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Lỗi trong quá trình cập nhật r_group của GroupStudentModel",
    });
  }
});
module.exports = { router };
