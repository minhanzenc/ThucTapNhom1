const express = require("express");
const router = express.Router();
const Group = require("../models/GroupModel");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const GroupStudent = require("../models/GroupStudentModel");
const Discuss = require("../models/discussModel");
const CustomError = require("../errors/CustomError");
const Request = require("../models/RequestModel");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
// thao luan mon hoc
router.post("/classroom", verifyToken, async (req, res) => {
  try {
    const { user } = req;
    const newDiscuss = new Discuss({
      message: req.body.message,
      r_classroom: req.body.r_classroom || "",

      r_account: user.id,
    });
    const savedDiscuss = await newDiscuss.save();
    res.status(200).json({
      success: true,
      message: "New discuss document created successfully",
      data: savedDiscuss,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating a new discuss document",
      error: err,
    });
  }
});

// thao luan nhom
router.post("/group", verifyToken, async (req, res) => {
  try {
    const { user } = req;
    const newDiscuss = new Discuss({
      message: req.body.message,
      r_group: req.body.r_group || "",

      r_account: user.id,
    });
    const savedDiscuss = await newDiscuss.save();
    res.status(200).json({
      success: true,
      message: "New discuss document created successfully",
      data: savedDiscuss,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating a new discuss document",
      error: err,
    });
  }
});
//lay tat cac discuss cua group
router.get("/group/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const discuss = await Discuss.find({ r_group: id }).populate([
      {
        path: "r_account",
        select: "-password", // exclude the password field
      },
    ]);
    res.json(discuss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//lay tat ca discuss cua classroom
router.get("/classroom/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const discuss = await Discuss.find({ r_classroom: id }).populate([
      {
        path: "r_account",
        select: "-password", // exclude the password field
      },
    ]);
    // const formattedDiscuss = discuss.map((item) => {
    //   return {
    //     r_student: item.r_student,
    //     r_teacher: item.r_teacher,
    //     NhomHienTai: item.r_group,
    //     status: item.status,
    //     NhomHMuonChuyen: item.recipient_group,
    //     _id: item._id,
    //   };
    // });
    res.json(discuss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = { router };
