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
function getOneById(id) {
  return groupStudentRepo.getOneById(id);
}
function getOne(query) {
  return groupStudentRepo.getOne(query);
}
function updateOne(groupStudentDTO, session) {
  return groupStudentRepo.updateOne(groupStudentDTO, session);
}
module.exports = {
  createMany,
  getByGroupId,
  getByStudentId,
  deleteOne,
  getAll,
  create,
  getOneById,
  updateOne,
  getOne,
};
