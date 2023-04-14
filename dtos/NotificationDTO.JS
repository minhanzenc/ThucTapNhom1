const {
  validateString,
  validateEmail,
  validateEnum,
  validateObjectId,
} = require("../validation/validation");
function sendNotificationDto(reqBody, recipient) {
  const input = reqBody;
  const errMessages = [];

  if (validateString(input.title))
    errMessages.push("trường 'title' chưa hợp lệ");
  if (validateString(input.message))
    errMessages.push("trường 'messages' chưa hợp lệ");
  if (validateObjectId(input.studentId))
    errMessages.push("trường 'studentId' chưa hợp lệ");
  if (validateObjectId(input.teacherId))
    errMessages.push("trường 'teacherId' chưa hợp lệ");

  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };
  return {
    data: {
      title: input.title,
      message: input.message,
      r_student: input.studentId,
      r_teacher: input.teacherId,
      recipient_id: recipient === "teacher" ? input.teacherId : input.studentId,
    },
  };
}

function getNotificationDTO(reqParams) {
  const errMessages = [];

  const input = reqParams;
  if (validateObjectId(input.id)) errMessages.push("trường 'Id' chưa hợp lệ");
  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };
  return {
    data: {
      recipient_id: input.id,
    },
  };
}
module.exports = { sendNotificationDto, getNotificationDTO };
