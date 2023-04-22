const subjectRepo = require("../repositories/SubjectRepo");
function create(subjectDTO, session) {
  return subjectRepo.create(subjectDTO, session);
}
function getAll(query) {
  return subjectRepo.getAll(query);
}
function deleteOne(id, session) {
  return subjectRepo.deleteOne(id, session);
}
function getOneById(id) {
  return subjectRepo.getOneById(id);
}
function updateOne(subjectDTO, session) {
  return subjectRepo.updateOne(subjectDTO, session);
}
module.exports = { create, getOneById, getAll, deleteOne, updateOne };
