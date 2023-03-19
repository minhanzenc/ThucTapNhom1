const Notification = require("../models/NotificationModel");
const Student = require("../models/StudentModel");

const findStudentById = (id) => {
  return Student.findById(id);
};
module.exports = { findStudentById };
