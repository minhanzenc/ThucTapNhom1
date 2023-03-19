const express = require("express");
const router = express.Router();
const Notification = require("../models/NotificationModel");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const CustomError = require("../errors/CustomError");
const { verifyToken, authorize } = require("../middlewares/VerifyToken");
const { studentsendteacherDto } = require("../dtos/NotificationDTO.JS");
const NotificationService = require("../services/notificationService");

// router.post(
//   "/teacher/send-to-student",
//   verifyToken,
//   authorize(["teacher"]),
//   async (req, res) => {
//     try {
//       // const teacherId = req.user._id;
//       const { studentId, teacherId, title, message } = req.body;
//       console.log(teacherId, studentId, title, message);
//       const notificationDTO = studentsendteacherDto(req.body);
//       if (notificationDTO.hasOwnProperty("errMessage"))
//         throw new CustomError(userDTO.errMessage, 400);
//       // res.status(200).send(studentId, teacherId, title, message);
//       const student = await Student.findById(studentId);
//       if (!student) {
//         throw new CustomError("Không tìm thấy sinh viên với id đã cho", 400);
//       }

//       const notification = new Notification({
//         title,
//         message,
//         r_student: studentId,
//         r_teacher: teacherId,
//       });

//       await notification.save();

//       return res.status(201).json(notification);
//     } catch (error) {
//       if (error instanceof CustomError) {
//         return res.status(error.code).json({ message: error.message });
//       }
//       console.error(error);
//       return res
//         .status(500)
//         .json({ message: "Đã có lỗi xảy ra khi gửi thông báo." });
//     }
//   }
// );
// teacher gui thong bao cho hoc sinh
router.post(
  "/teacher/send-to-student",
  verifyToken,
  authorize(["teacher"]),
  async (req, res) => {
    try {
      // const teacherId = req.user._id;
      const { studentId, teacherId, title, message } = req.body;
      console.log(teacherId, studentId, title, message);
      const notificationDTO = studentsendteacherDto(req.body);
      console.log("data no ", notificationDTO.data);
      if (notificationDTO.hasOwnProperty("errMessage"))
        throw new CustomError(userDTO.errMessage, 400);
      // res.status(200).send(studentId, teacherId, title, message);
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

//nhan thong bao cua teacher gui
router.get("/students/:studentId", async (req, res) => {
  try {
    console.log("id: ", req.params.studentId);
    const notifications = await Notification.find({
      r_student: req.params.studentId,
    })
      .populate("r_student", "firstName lastName")
      .populate("r_teacher", "firstName lastName")
      .exec();
    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
});
module.exports = { router };
