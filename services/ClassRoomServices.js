const classRoomRepo = require("../repositories/ClassRoomRepo");

function create(classRoomDTO, session) {
  return classRoomRepo.create(classRoomDTO, session);
}
function deleteOne(id, session) {
  return classRoomRepo.deleteOne(id, session);
}
function getAll(teacherId, query) {
  return classRoomRepo.getAll(teacherId, query);
}
function update(classRoomDTO, session) {
  return classRoomRepo.updateOne(classRoomDTO, session);
}
function getByTeacherId(teacherId) {
  return classRoomRepo.getByTeacherId(teacherId);
}
function getBySubjectId(subjectId) {
  return classRoomRepo.getBySubjectId(subjectId);
}
function getOneById(id) {
  return classRoomRepo.getOneById(id);
}
module.exports = {
  create,
  deleteOne,
  getAll,
  update,
  getOneById,
  getByTeacherId,
  getBySubjectId,
};
