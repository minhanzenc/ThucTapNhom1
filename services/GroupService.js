const groupRepo = require("../repositories/GroupRepo");
const groupStudentRepo = require("../repositories/GroupStudentRepo");
const ConditionToCreateGroup = require("../models/ConditiontoCreateGroupModel");

function create(groupDTO, session) {
  return groupRepo.create(groupDTO, session);
}
function deleteOne(id, session) {
  return groupRepo.deleteOne(id, session);
}
async function deleteByClassRoomId(id, session) {
  const result = await Promise.all([
    groupStudentRepo.deleteMany(id, session),
    groupRepo.deleteMany(id, session),
    ConditionToCreateGroup.deleteOne({r_classroom: id}),
  ])
  return result;
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
  deleteByClassRoomId,
};
