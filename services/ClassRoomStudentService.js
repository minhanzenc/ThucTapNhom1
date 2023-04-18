const classRoomStudentRepo = require('../repositories/ClassRoomStudentRepo');

function createMany(classRoomStudents, session) {
    return classRoomStudentRepo.createMany(classRoomStudents, session);
}

function getByClassRoomId(classRoomId) {
    return classRoomStudentRepo.getByClassRoomId(classRoomId)
}
function getByStudentId(idStudent){
    return classRoomStudentRepo.getByStudentId(idStudent)
}
function deleteOne(id, session) {
    return classRoomStudentRepo.deleteOne(id, session);
  }
module.exports = { createMany, getByClassRoomId ,getByStudentId,deleteOne};