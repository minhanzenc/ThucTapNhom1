const express = require("express");
const router = express.Router();
const Group = require("../models/GroupModel");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const Subject = require("../models/SubjectModel");
const GroupStudent = require("../models/GroupStudentModel");
const CustomError = require("../errors/CustomError");
const Request = require("../models/RequestModel");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");

router.post("/add", async (req, res) => {
  try {
    const newDiscuss = new discussModel({
      message: req.body.message,
      r_subject: req.body.r_subject || "",
      r_group: req.body.r_group || "",
      r_account: req.body.r_account,
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
module.exports = { router };
