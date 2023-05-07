//sàn lọc dữ liệu,kiểm tra validate (dữ liệu đầu vào)
const RoleStudentEnum = require("../enums/RoleStudentEnums")
const {validateObjectId, validateEnum } = require("../validation/validation")

function createGroupStudentDto(reqBody) {
    const input = reqBody
    const errMessages = []

    if (validateEnum(RoleStudentEnum, input.role))
        errMessages.push("trường 'role' chưa hợp lệ")
 
    if (validateObjectId(input.r_group))
        errMessages.push("trường 'r_group' chưa hợp lệ")

    if (validateObjectId(input.r_student))
        errMessages.push("trường 'r_student' chưa hợp lệ")

    if (validateObjectId(input.r_classroom))
        errMessages.push("trường 'r_classroom' chưa hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
    return { data: { role: input.role, r_group: input.r_group, r_student: input.r_student, r_classroom: input.r_classroom } }
}
function deleteGroupStudentDto(id)
{
    const errMessage=[]
    if(validateObjectId(id)){
        errMessage.push("ID không hợp lệ")
    }
    if(errMessage.leng>0){
        return { errMessage: errMessage.reduce((total, err) => `${total} ${err}---`, "") }
    }
    return {data:{id}}
}
module.exports = { createGroupStudentDto,deleteGroupStudentDto }