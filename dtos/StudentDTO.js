const { validateObjectId, validateString, validatePhone, validateEmail } = require("../validation/validation")
function createStudentDTO(input) {
    const errMessages = []

    if (validateString(input.lastName))
        errMessages.push("trường 'lastname' chưa hợp lệ")
    if (validateString(input.firstName))
        errMessages.push("trường 'firstname' chưa hợp lệ")
    if (validateString(input.classRoom))
        errMessages.push("trường 'class' chưa hợp lệ")
    if (validatePhone(input.phone))
        errMessages.push("trường 'phone' chưa hợp lệ")
    if (validateEmail(input.email))
        errMessages.push("trường 'email' chưa hợp lệ")
    if (validateObjectId(input.r_account))
        errMessages.push("trường 'r_account' chưa hợp lệ")
    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
    return { data: { lastName: input.lastName, firstName: input.firstName, classRoom: input.classRoom, phone: input.phone, email: input.email, r_account: input.r_account } }
}
function deleteStudentDTO(id) {
    const errMessages = []

    if (validateObjectId(id))
        errMessages.push("Id không hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

    return { data: { id } }

}
function updateStudentDTO(id, reqBody) {
    const input = reqBody
    console.log(input)
    const errMessages = []
    if (validateString(input.lastName))
        errMessages.push("trường 'lastName' chưa hợp lệ")
    if (validateString(input.firstName))
        errMessages.push("trường 'firstName' chưa hợp lệ")
    if (validateObjectId(id))
        errMessages.push("Id không hợp lệ")
    if (validatePhone(input.phone))
        errMessages.push("trường 'phone' chưa hợp lệ")
    if (validateString(input.classRoom))
        errMessages.push("trường 'class' chưa hợp lệ")
    if (validateEmail(input.email))
        errMessages.push("trường 'email' chưa hợp lệ")
    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

    const data = { id, lastName: input.lastName, firstName: input.firstName, phone: input.phone,classRoom:input.classRoom, email: input.email }
    return { data }
}
module.exports = { createStudentDTO, deleteStudentDTO, updateStudentDTO }