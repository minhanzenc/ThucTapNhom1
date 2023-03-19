const { validateObjectId,validateString, validatePhone, validateEmail } = require("../validation/validation")
function createTeacherDTO(input) {
    const errMessages = []
    console.log(input)
    if (validateString(input.lastName))
        errMessages.push("trường 'lastname' chưa hợp lệ")
    if (validateString(input.firstName))
        errMessages.push("trường 'firstname' chưa hợp lệ")
    if (validatePhone(input.phone))
        errMessages.push("trường 'phone' chưa hợp lệ")
    if (validateEmail(input.email))
        errMessages.push("trường 'email' chưa hợp lệ")
    if (validateObjectId(input.r_account))
        errMessages.push("trường 'r_account' chưa hợp lệ")
    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
    return { data: { lastName: input.lastName,firstName: input.firstName,phone: input.phone,email: input.email, r_account: input.r_account } }
}
function deleteTeacherDTO(id) {
    const errMessages = []

    if (validateObjectId(id))
        errMessages.push("Id không hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

    return { data: { id } }

}
module.exports = { createTeacherDTO ,deleteTeacherDTO}