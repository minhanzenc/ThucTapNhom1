const teacher = require("../models/TeacherModel")

const create = ({ lastName,firstName,phone,email, r_account }, session) => {
    return teacher.create([{ lastName,firstName,phone,email, r_account }], { session })
}

const deleteOne = (id,session) => {
    return teacher.findByIdAndDelete(id,{session})
}
module.exports = { create ,deleteOne}
//xoa mon hoc thi moi quan he giua giang vien sinh vien voi mon hoc se ra sao