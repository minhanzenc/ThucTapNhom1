const subjectRepo = require('../repositories/SubjectRepo')

function create(subjectDTO, session) {
    return subjectRepo.create(subjectDTO,session)
}
function deleteOne(id,session) {
    return subjectRepo.deleteOne(id,session)
}
module.exports = { create ,deleteOne}