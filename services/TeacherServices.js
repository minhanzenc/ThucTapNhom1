const teacherRepo = require("../repositories/TeacherRepo");

function create(teacherDTO, session) {
  return teacherRepo.create(teacherDTO, session);
}
function deleteOne(id, session) {
  return teacherRepo.deleteOne(id, session);
}

function getAll() {
  return teacherRepo.getAll();
}
function update(teacherDTO, session) {
  return teacherRepo.updateOne(teacherDTO, session);
}
module.exports = { create, deleteOne, getAll, update };
