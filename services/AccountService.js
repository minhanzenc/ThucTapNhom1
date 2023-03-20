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
    console.log(foundUser);
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
    console.log("hello", error);
    return Promise.reject(new CustomError(error.toString(), 500));
  }
}

module.exports = { login };
