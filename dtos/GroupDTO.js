const { validateString, validateObjectId } = require("../validation/validation");

function createGroupDTO(input){
    const errMessage=[]
    if(validateString(input.name)){
        errMessage.push("trường 'Name' chưa hợp lệ")
    }
    if(errMessage.length>0){
        return errMessage
    }
    const data={name:input.name}
    return {data}
}
function deleteGroupDTO(id){
    const errMessage=[]
    if(validateObjectId(id)){
        errMessage.push("ID không hợp lệ")
    }
    if(errMessage.length>0)
    {
        return errMessage
    }
    const data={id}
    return {data}
}
function updateGroupDTO(id,reqBody){
    const errMessage=[]
    const input=reqBody
    if(validateObjectId(id)){
        errMessage.push("ID không hợp lệ")
    }
    if(validateString(input.name))
    {
        errMessage.push("trường 'name' chưa hợp lệ")
    }
    if(errMessage.length>0){
        return {errMessage:errMessage.reduce((total,err)=>`${total} ${err}---`,"")}
    }
    const data={id,name:input.name}
    return {data}
}
module.exports={createGroupDTO,deleteGroupDTO,updateGroupDTO}
