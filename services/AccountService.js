const { CustomError } = require("../errors/CustomError");
const accountRepo = require("../repositories/AccountRepo");
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
    console.log("token service", signedToken);
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

function create(account,session){
  return accountRepo.create(account,session)
}

function createMany(accounts, session) {
  return accountRepo.createMany(accounts, session)
}

module.exports = { login, createMany, create };
