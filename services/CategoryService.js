const categoryRepo = require('../repositories/CategoryRepo')

function getAll() {
    return categoryRepo.getAll()
}

function create(categoryDTO, session) {
    return categoryRepo.create(categoryDTO,session)
}

function update(categoryDTO, session) {
    return categoryRepo.updateOne(categoryDTO,session)
}

function getByName(name) {
    return categoryRepo.getByName(name)
}

function getById(id) {
    return categoryRepo.getById(id)
}

function deleteOne(id,session) {
    return categoryRepo.deleteOne(id,session)
}

module.exports = { getAll, create, getById, getByName,deleteOne , update}