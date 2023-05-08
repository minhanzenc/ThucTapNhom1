const { validateString, validateObjectId } = require("../validation/validation")
function createClassRoomDTO(input) {
    const errMessages = []

    if (validateString(input.name))
        errMessages.push("trường 'name' chưa hợp lệ")
    if (validateString(input.period))
        errMessages.push("trường 'ca học' chưa hợp lệ")
    if (validateObjectId(input.r_subject))
        errMessages.push("trường 'r_subject' chưa hợp lệ")
    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
    return { data: { name: input.name,period: input.period, r_subject: input.r_subject } }
}
function deleteClassRoomDTO(id) {
    const errMessages = []

    if (validateObjectId(id))
        errMessages.push("Id không hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

    return { data: { id } }

}
function updateClassRoomDTO(id, reqBody) {
    const input = reqBody
    // console.log(input)
    const errMessages = []
    if (validateString(input.name))
        errMessages.push("trường 'name' chưa hợp lệ")
    if (validateString(input.period))
        errMessages.push("trường 'ca học' chưa hợp lệ")
    if (validateObjectId(input.r_subject))
        errMessages.push("trường 'r_subject' chưa hợp lệ")
    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

    const data = { id, name: input.name,period: input.period, r_subject: input.r_subject }
    return { data }
}
module.exports = { createClassRoomDTO, deleteClassRoomDTO, updateClassRoomDTO }