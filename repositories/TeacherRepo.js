const teacher = require("../models/TeacherModel");

const create = ({ lastName, firstName, phone, email, r_account }, session) => {
  return teacher.create([{ lastName, firstName, phone, email, r_account }], {
    session,
  });
};

const deleteOne = (id, session) => {
  return teacher.findByIdAndDelete(id, { session });
};
const getAll = async ({ page = 1, pageSize = 10 }) => {
  const take = (page - 1) * pageSize;
  const [countTeacher, teachers] = await Promise.all([
    teacher.count({}),
    teacher.find({}).skip(take).limit(pageSize).sort({ _id: -1 }),
  ]);
  console.log(countTeacher, teachers);
  return {
    total: countTeacher,
    teachers,
  };
};
const getOneById = (id) => {
  return teacher.findById({ _id: id, active: true });
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

module.exports = { getOneById, create, deleteOne, getAll, updateOne };
