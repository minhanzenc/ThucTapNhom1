const { validateString, validateObjectId } = require("../validation/validation")
function createSubjectDTO(input) {
    const errMessages = []

    if (validateString(input.name))
        errMessages.push("trường 'name' chưa hợp lệ")
    if (validateObjectId(input.r_teacher))
        errMessages.push("trường 'r_teacher' chưa hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
    return { data: { name: input.name, r_teacher: input.r_teacher } }
}
function deleteSubjectDTO(id) {
    const errMessages = []

    if (validateObjectId(id))
        errMessages.push("Id không hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

    return { data: { id } }

}
module.exports = { createSubjectDTO,deleteSubjectDTO }