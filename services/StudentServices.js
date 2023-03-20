const studentRepo = require("../repositories/StudentRepo");

function create(studentDTO, session) {
  return studentRepo.create(studentDTO, session);
}
function deleteOne(id, session) {
  return studentRepo.deleteOne(id, session);
}
module.exports = { create, deleteOne };
