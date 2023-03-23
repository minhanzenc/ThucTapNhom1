const studentRepo = require("../repositories/StudentRepo");

function create(studentDTO, session) {
  return studentRepo.create(studentDTO, session);
}
function deleteOne(id, session) {
  return studentRepo.deleteOne(id, session);
}
function getAll() {
  return studentRepo.getAll();
}
function update(studentDTO, session) {
  return studentRepo.updateOne(studentDTO, session);
}
module.exports = { create, deleteOne, getAll, update };
