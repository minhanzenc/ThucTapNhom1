const express = require("express");
const router = express.Router();
const Notification = require("../models/NotificationModel");
const Student = require("../models/StudentModel");
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
      const { studentId, teacherId, title, message } = req.body;
      const notificationDTO = sendNotificationDto(req.body, "student");
      if (notificationDTO.hasOwnProperty("errMessage"))
        throw new CustomError(notificationDTO.errMessage, 400);
      const notification = await NotificationService.sendToTeacher(
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

//sv gui thong bao cho teacher
router.post(
  "/student/",
  verifyToken,
  authorize(["student"]),
  async (req, res) => {
    try {
      const notificationDTO = sendNotificationDto(req.body, "teacher");
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
      const notificationDTO = getNotificationDTO(req.params);
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
      const notificationDTO = getNotificationDTO(req.params);
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
module.exports = { router };
