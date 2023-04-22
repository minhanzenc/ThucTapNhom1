const subject = require("../models/SubjectModel");

const create = ({ name }, session) => {
  return subject.create([{ name }], { session });
};
const getAll = async ({ page = 1, pageSize = 10 }) => {
  const take = (page - 1) * pageSize;
  const [countSubject, subjects] = await Promise.all([
    subject.count({}),
    subject.find({}).skip(take).limit(pageSize).sort({ _id: -1 }),
  ]);
  console.log(countSubject, subjects);
  return {
    total: countSubject,
    subjects,
  };
};
const deleteOne = (id, session) => {
  return subject.findByIdAndDelete(id, session);
};
const getOneById = (id) => {
  return subject.findById({ _id: id, active: true });
};
const updateOne = ({ id, name }, session) => {
  return subject.findByIdAndUpdate(
    { _id: id },
    { name },
    { new: true, session }
  );
};
module.exports = { create, getOneById, getAll, deleteOne, updateOne };
