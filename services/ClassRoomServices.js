const classRoomRepo = require("../repositories/ClassRoomRepo");

function create(classRoomDTO, session) {
  return classRoomRepo.create(classRoomDTO, session);
}
function deleteOne(id, session) {
  return classRoomRepo.deleteOne(id, session);
}
function getAll() {
  return classRoomRepo.getAll();
}
function update(classRoomDTO, session) {
  return classRoomRepo.updateOne(classRoomDTO, session);
}
module.exports = { create, deleteOne, getAll, update };
