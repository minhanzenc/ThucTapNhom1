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

function createMany(students, session){
    return studentRepo.createMany(students, session);
}

module.exports = { create, createMany,deleteOne,getAll,update }
