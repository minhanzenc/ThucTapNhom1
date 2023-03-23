const subjectRepo = require("../repositories/SubjectRepo");

function create(subjectDTO, session) {
  return subjectRepo.create(subjectDTO, session);
}
function deleteOne(id, session) {
  return subjectRepo.deleteOne(id, session);
}
function getAll() {
  return subjectRepo.getAll();
}
function update(subjectDTO, session) {
  return subjectRepo.updateOne(subjectDTO, session);
}
module.exports = { create, deleteOne, getAll, update };
