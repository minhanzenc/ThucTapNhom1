const {
  validateString,
  validateEmail,
  validateEnum,
  validateObjectId,
} = require("../validation/validation");
function loginAccountDto(reqBody) {
  const input = reqBody;
  const errMessages = [];

  if (validateString(input.email))
    errMessages.push("trường 'username' chưa hợp lệ");
  if (validateString(input.password))
    errMessages.push("trường 'password' chưa hợp lệ");

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };
  return {
    data: {
      email: input.email,
      password: input.password,
    },
  };
}

module.exports = { loginAccountDto };
