const {
  validateString,
  validateObjectId,
} = require("../validation/validation");
function loginAccountDto(reqBody) {
  const input = reqBody;
  const errMessages = [];

  if (validateString(input.email))
    errMessages.push("trường 'email' chưa hợp lệ");
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
function deleteAccountDTO(id) {
  const errMessages = []

  if (validateObjectId(id))
      errMessages.push("Id không hợp lệ")

  if (errMessages.length > 0)
      return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

  return { data: { id } }

}
module.exports = { loginAccountDto,deleteAccountDTO };
