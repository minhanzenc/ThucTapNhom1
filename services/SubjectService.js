const subjectRepo=require("../repositories/SubjectRepo")
function create(subjectDTO,session){
    return subjectRepo.create(subjectDTO,session)
}
function getAll(){
    return subjectRepo.getAll()
}
function deleteOne(id,session){
    return subjectRepo.deleteOne(id,session)
}
function updateOne(subjectDTO,session){
    return subjectRepo.updateOne(subjectDTO,session)
}
module.exports={create,getAll,deleteOne,updateOne}