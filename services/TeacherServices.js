const teacherRepo = require('../repositories/TeacherRepo')

function create(teacherDTO, session) {
    return teacherRepo.create(teacherDTO,session)
}
function deleteOne(id,session) {
    return teacherRepo.deleteOne(id,session)
}
module.exports = { create ,deleteOne}