const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const Notification = require("../models/NotificationModel");
const Student = require("../models/StudentModel");
const Account = require("../models/AccountModel");
const Teacher = require("../models/TeacherModel");
const CustomError = require("../errors/CustomError");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
const {
  sendNotificationDto,
  getNotificationDTO,
} = require("../dtos/NotificationDTO.JS");
const NotificationService = require("../services/notificationService");

// teacher gui thong bao cho hoc sinh
router.post(
  "/teacher/",
  verifyToken,
  authorize(["teacher"]),
  async (req, res) => {
    try {
      // const teacherId = req.user._id;
      const { user } = req;
      const teacherID = await Teacher.findOne({ r_account: user.id });
      console.log("teacher ", teacherID.id);
      if (!teacherID) {
        return res
          .status(404)
          .json({ error: "teacher chua co thong tin chi tiet trong he thong" });
      }
      const notificationDTO = sendNotificationDto(
        req.body,
        teacherID,
        "student"
      );
      if (notificationDTO.hasOwnProperty("errMessage"))
        throw new CustomError(notificationDTO.errMessage, 400);
      const notification = await NotificationService.sendToTeacher(
        notificationDTO.data
      );

      return res.status(201).json(notification);
      //return res.status(201);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.code).json({ message: error.message });
      }
      console.error(error);
      return res
        .status(500)
        .json({ message: "Đã có lỗi xảy ra khi gửi thông báo." });
    }
  }
);

//sv gui thong bao cho teacher
router.post(
  "/student/",
  verifyToken,
  authorize(["student"]),
  async (req, res) => {
    try {
      const { user } = req;
      const studentID = await Student.findOne({ r_account: user.id });

      if (!studentID) {
        return res.status(404).json({
          error: "học sinh chua co thong tin chi tiet trong he thong",
        });
      }
      const notificationDTO = sendNotificationDto(
        req.body,
        studentID,
        "teacher"
      );
      if (notificationDTO.hasOwnProperty("errMessage"))
        throw new CustomError(notificationDTO.errMessage, 400);
      const notification = await NotificationService.sendToStudent(
        notificationDTO.data
      );

      return res.status(201).json(notification);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.code).json({ message: error.message });
      }
      console.error(error);
      return res
        .status(500)
        .json({ message: "Đã có lỗi xảy ra khi gửi thông báo." });
    }
  }
);

//nhan thong bao cua teacher gui
router.get(
  "/students/:id",
  verifyToken,
  authorize(["student", "teacher"]),
  async (req, res) => {
    try {
      const { user } = req;
      const studentID = Student.findOne({ r_account: user.id });
      if (studentID) {
        return res
          .status(404)
          .json({ error: "student chua co thong tin chi tiet trong he thong" });
      }
      const notificationDTO = getNotificationDTO(studentID);
      if (notificationDTO.hasOwnProperty("errMessage"))
        throw new CustomError(notificationDTO.errMessage, 400);
      const notifications = await NotificationService.getNotification(
        notificationDTO.data
      );
      return res.status(200).json(notifications);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi hệ thống" });
    }
  }
);
//nhan thong bao cua sinh vien gui
router.get(
  "/teachers/:id",
  verifyToken,
  authorize(["teacher"]),
  async (req, res) => {
    try {
      const { user } = req;
      const teacherID = Teacher.findOne({ r_account: user.id });
      if (teacherID) {
        return res
          .status(404)
          .json({ error: "teacher chua co thong tin chi tiet trong he thong" });
      }
      const notificationDTO = getNotificationDTO(teacherID);
      if (notificationDTO.hasOwnProperty("errMessage"))
        throw new CustomError(notificationDTO.errMessage, 400);

      const notifications = await NotificationService.getNotification(
        notificationDTO.data
      );
      return res.status(200).json(notifications);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi hệ thống" });
    }
  }
);

//xoa các thông báo dc gửi dến
// DELETE /notifications/:id
// Delete a notification by ID
router.delete("/delete/:id", verifyToken, async (req, res) => {
  const notificationId = req.params.id;

  try {
    const notification = await Notification.findOne({ _id: notificationId });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    await Notification.deleteOne({ _id: notificationId });
    return res
      .status(200)
      .json({ message: "Notification deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//gửi thông bao đến nhóm

router.post("/group", verifyToken, authorize(["teacher"]), async (req, res) => {
  try {
    const { title, message, r_teacher, r_group } = req.body;

    const newNotification = new Notification({
      title,
      message,
      r_teacher,
      r_group,
    });

    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add notification" });
  }
});
//gui thong bao den classroom
router.post("/classroom", async (req, res) => {
  try {
    const { title, message, r_teacher, r_classroom } = req.body;

    const newNotification = new Notification({
      title,
      message,
      r_teacher,
      r_classroom,
    });

    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add notification" });
  }
});
router.get("/group/:r_group", async (req, res) => {
  try {
    const { r_group } = req.params;
    const notification = await Notification.find({ r_group })
      .populate("r_student", "firstName lastName")
      .populate("r_teacher", "firstName lastName")
      .exec();
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
router.get("/classroom/:r_classroom", async (req, res) => {
  try {
    const { r_classroom } = req.params;
    const notification = await Notification.find({ r_classroom })
      .populate("r_student", "firstName lastName")
      .populate("r_teacher", "firstName lastName")
      .exec();
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = { router };
