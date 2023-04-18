const classRoomRepo = require("../repositories/ClassRoomRepo");

function create(classRoomDTO, session) {
  return classRoomRepo.create(classRoomDTO, session);
}
function deleteOne(id, session) {
  return classRoomRepo.deleteOne(id, session);
}
function getAll(teacherId) {
  return classRoomRepo.getAll(teacherId);
}
function update(classRoomDTO, session) {
  return classRoomRepo.updateOne(classRoomDTO, session);
}
function getByTeacherId(teacherId){
  return classRoomRepo.getByTeacherId(teacherId)
}
function getBySubjectId(subjectId){
  return classRoomRepo.getBySubjectId(subjectId)
}
module.exports = { create, deleteOne, getAll, update,getByTeacherId ,getBySubjectId};
