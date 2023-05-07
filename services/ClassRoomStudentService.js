const classRoomStudentRepo = require("../repositories/ClassRoomStudentRepo");

function createMany(classRoomStudents, session) {
  return classRoomStudentRepo.createMany(classRoomStudents, session);
}

function getByClassRoomId(classRoomId) {
  return classRoomStudentRepo.getByClassRoomId(classRoomId);
}
function getAll(classRoomId) {
  return classRoomStudentRepo.getAll(classRoomId);
}
function getByStudentId(idStudent) {
  return classRoomStudentRepo.getByStudentId(idStudent);
}
function deleteOne(id, session) {
  return classRoomStudentRepo.deleteOne(id, session);
}
function create(classRoomStudentDTO, session) {
  return classRoomStudentRepo.create(classRoomStudentDTO, session);
}
function getOneById(id) {
  return classRoomStudentRepo.getOneById(id);
}
function updateOne(ClassRoomStudentDTO, session) {
  return classRoomStudentRepo.updateOne(ClassRoomStudentDTO, session);
}
module.exports = {
  createMany,
  getByClassRoomId,
  getByStudentId,
  deleteOne,
  getAll,
  create,
  getOneById,
  updateOne,
};
