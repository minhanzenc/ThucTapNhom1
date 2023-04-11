const Notification = require("../models/NotificationModel");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");

const findStudentById = (id) => {
  return Student.findById(id);
};
const findTeacherById = (id) => {
  return Teacher.findById(id);
};
const findByRecipient = (recipient) => {
  return Notification.find({
    recipient_id: recipient,
  });
};
module.exports = { findStudentById, findByRecipient, findTeacherById };
