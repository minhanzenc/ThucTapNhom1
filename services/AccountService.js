const { CustomError } = require("../errors/CustomError");
const accountRepo = require("../repositories/AccountRepo");
const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const bcrypt = require("bcrypt");
const { signToken } = require("../helpers/signToken");

async function login(userDTO) {
  try {
    const foundUser = await accountRepo.getByEmail(userDTO.email);
    if (!foundUser) throw new CustomError("Email không tồn tại", 400);
    // const isSamePassword = await bcrypt.compareSync(
    //   userDTO.password,
    //   foundUser.password
    // );

    const isSamePassword = userDTO.password === foundUser.password;
    if (!isSamePassword)
      throw new CustomError("mật khẩu không trùng khớp", 400);
    const signedToken = signToken(foundUser);
    let ChildId;
    console.log("loginuser", foundUser);
    if (foundUser.role == "teacher") {
      ChildId = await Teacher.find({ r_account: foundUser.id });
    } else {
      ChildId = await Student.find({ r_account: foundUser.id });
    }
    return Promise.resolve({
      token: signedToken,
      mail: foundUser.email,
      role: foundUser.role,
    });
    //return signToken;
  } catch (error) {
    return Promise.reject(new CustomError(error.toString(), 500));
  }
}

function create(account, session) {
  return accountRepo.create(account, session);
}

function createMany(accounts, session) {
  return accountRepo.createMany(accounts, session);
}
function deleteOne(id,session){
  return accountRepo.deleteOne(id,session)
}
module.exports = { login, createMany, create, deleteOne};
