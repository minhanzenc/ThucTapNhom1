const groupRepo = require("../repositories/GroupRepo");

function create(groupDTO, session) {
  return groupRepo.create(groupDTO, session);
}
function deleteOne(id, session) {
  return groupRepo.deleteOne(id, session);
}
function getAll(classRoomId, query) {
  return groupRepo.getAll(classRoomId, query);
}
function updateOne(groupDTO, session) {
  return groupRepo.updateOne(groupDTO, session);
}
function getByclassRoomId(classRoomId) {
  return groupRepo.getByClassRoomId(classRoomId);
}
function getOneById(id) {
  return groupRepo.getOneById(id);
}
module.exports = {
  create,
  deleteOne,
  getAll,
  updateOne,
  getOneById,
  getByclassRoomId,
};
