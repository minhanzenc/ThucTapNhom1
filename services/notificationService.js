const { CustomError } = require("../errors/CustomError");
const NotificationRepo = require("../repositories/NotificationRepo");
const Notification = require("../models/NotificationModel");
async function sendToTeacher(notificationDTO) {
  try {
    console.log("ma sinh vien ", notificationDTO.r_student);
    const student = await NotificationRepo.findStudentById(
      notificationDTO.r_student
    );
    if (!student) throw new CustomError("sinh vien không tồn tại", 400);
    const notification = new Notification({ ...notificationDTO });

    await notification.save();
    return Promise.resolve(notification);
    //return signToken;
  } catch (error) {
    console.log("hello", error);
    return Promise.reject(new CustomError(error.toString(), 500));
  }
}

module.exports = { sendToTeacher };
