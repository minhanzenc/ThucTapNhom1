const groupStudentRepo = require("../repositories/GroupStudentRepo");

function createMany(groupStudents, session) {
  return groupStudentRepo.createMany(groupStudents, session);
}

function getByGroupId(groupId) {
  return groupStudentRepo.getByGroupId(groupId);
}
function getAll(groupId) {
  return groupStudentRepo.getAll(groupId);
}
function getByStudentId(idStudent) {
  return groupStudentRepo.getByStudentId(idStudent);
}
function deleteOne(id, session) {
  return groupStudentRepo.deleteOne(id, session);
}
function create(groupStudentDTO, session) {
  return groupStudentRepo.create(groupStudentDTO, session);
}
module.exports = {
  createMany,
  getByGroupId,
  getByStudentId,
  deleteOne,
  getAll,
  create,
};
