const { CustomError } = require("../errors/CustomError");
const NotificationRepo = require("../repositories/NotificationRepo");
const Notification = require("../models/NotificationModel");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
async function sendToTeacher(notificationDTO) {
  try {
    const student = await NotificationRepo.findStudentById(
      notificationDTO.r_student
    );
    if (!student) throw new CustomError("sinh vien không tồn tại", 400);
    const notification = new Notification({ ...notificationDTO });

    await notification.save();
    return Promise.resolve(notification);
  } catch (error) {
    console.log("hello", error);
    return Promise.reject(new CustomError(error.toString(), 500));
  }
}
async function sendToStudent(notificationDTO) {
  try {
    const student = await NotificationRepo.findTeacherById(
      notificationDTO.r_teacher
    );
    if (!student) throw new CustomError("giao vien không tồn tại", 400);
    const notification = new Notification({ ...notificationDTO });

    await notification.save();
    return Promise.resolve(notification);
  } catch (error) {
    console.log("hello", error);
    return Promise.reject(new CustomError(error.toString(), 500));
  }
}
async function getNotification(notificationDTO) {
  try {
    const notification = await NotificationRepo.findByRecipient(
      notificationDTO.recipient_id
    )
      // .populate("r_student", "firstName lastName")
      // .populate("r_teacher", "firstName lastName")
      .populate("r_student")
      .populate("r_teacher")
      .exec();
    return Promise.resolve(notification);
  } catch (error) {
    console.log("hello", error);
    return Promise.reject(new CustomError(error.toString(), 500));
  }
}

module.exports = { sendToTeacher, getNotification, sendToStudent };
