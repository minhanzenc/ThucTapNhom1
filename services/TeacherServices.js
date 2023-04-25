const teacherRepo = require("../repositories/TeacherRepo");

function create(teacherDTO, session) {
  return teacherRepo.create(teacherDTO, session);
}
function deleteOne(id, session) {
  return teacherRepo.deleteOne(id, session);
}
function getOneById(id) {
  return teacherRepo.getOneById(id);
}
function getAll(query) {
  return teacherRepo.getAll(query);
}
function update(teacherDTO, session) {
  return teacherRepo.updateOne(teacherDTO, session);
}
module.exports = { create,getOneById, deleteOne, getAll, update };
