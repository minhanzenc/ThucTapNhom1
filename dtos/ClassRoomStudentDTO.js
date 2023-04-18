//sàn lọc dữ liệu,kiểm tra validate (dữ liệu đầu vào)
const RoleGroupEnum = require("../enums/RoleGroupEnum")
const {validateObjectId, validateEnum } = require("../validation/validation")

function createClassRoomStudentDto(reqBody) {
    const input = reqBody
    const errMessages = []

    if (validateEnum(RoleGroupEnum, input.role))
        errMessages.push("trường 'role' chưa hợp lệ")
 
    if (validateObjectId(input.r_classroom))
        errMessages.push("trường 'r_classroom' chưa hợp lệ")

    if (validateObjectId(input.r_student))
        errMessages.push("trường 'r_student' chưa hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
    return { data: { role: input.role, r_classroom: input.r_classroom, r_student: input.r_student } }
}

module.exports = { createClassRoomStudentDto }