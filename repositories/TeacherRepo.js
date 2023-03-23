const teacher = require("../models/TeacherModel");

const create = ({ lastName, firstName, phone, email, r_account }, session) => {
  return teacher.create([{ lastName, firstName, phone, email, r_account }], {
    session,
  });
};

const deleteOne = (id, session) => {
  return teacher.findByIdAndDelete(id, { session });
};
const getAll = () => {
  return teacher.find({ active: true });
};
const updateOne = ({ id, lastName, firstName, phone, email }, session) => {
  return teacher
    .findOneAndUpdate(
      { _id: id },
      { lastName, firstName, phone, email },
      { new: true }
    )
    .session(session);
};

module.exports = { create, deleteOne, getAll, updateOne };
