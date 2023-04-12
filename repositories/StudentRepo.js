const student = require("../models/StudentModel");

const create = (
  { lastName, firstName, classRoom, phone, email, r_account },
  session
) => {
  return student.create(
    [{ lastName, firstName, classRoom, phone, email, r_account }],
    { session }
  );
};
const createMany = (students, session) => {
  return student.insertMany(students, { session });
};
const deleteOne = (id, session) => {
  return student.findByIdAndDelete(id, { session });
};
const getAll = async ({ page = 1, pageSize = 10 }) => {
  const take = (page - 1) * pageSize;
  const [countStudent, students] = await Promise.all([
    student.count({ active: true }),
    student.find({ active: true }).skip(take).limit(pageSize),
  ]);

  return {
    total: countStudent,
    students,
  };
};
const updateOne = (
  { id, lastName, firstName, phone, classRoom, email },
  session
) => {
  return student
    .findOneAndUpdate(
      { _id: id },
      { lastName, firstName, phone, classRoom, email },
      { new: true }
    )
    .session(session);
};

module.exports = { create, deleteOne, getAll, updateOne, createMany };
