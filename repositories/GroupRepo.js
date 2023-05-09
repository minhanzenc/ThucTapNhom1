const group = require("../models/GroupModel");

const create = ({ name, r_classroom,r_teacher }, session) => {
  return group.create([{ name, r_classroom,r_teacher }], {
    session,
  });
};
const deleteOne = (id, session) => {
  return group.findByIdAndDelete(id, { session });
};
const deleteMany = (r_classroom, session) => {
  return group.deleteMany({r_classroom}, { session });
};
// const getAll = (classRoomId) => {
//     return group.find({ active: true, r_teacher: classRoomId})
// }
const getAll = async (classRoomId, { page = 1, pageSize = 10 }) => {
  const take = (page - 1) * pageSize;
  const [countGroup, groups] = await Promise.all([
    group.count({r_classroom: classRoomId}),
    group
      .find({ r_classroom: classRoomId })
      .skip(take)
      .limit(pageSize)
      .sort({ _id: -1 })
      .lean(),
  ]);
  return {
    total: countGroup,
    groups,
  };
};

const getByClassRoomId = (classRoomId) => {
  return group.find({
    r_classroom: classRoomId,
  });
};

const updateOne = ({ id, name, r_classroom,r_teacher}, session) => {
  return group
    .findOneAndUpdate(
      { _id: id },
      { name, r_classroom,r_teacher },
      { new: true }
    )
    .session(session);
};
const getOneById = (id) => {
  return group.findById({ _id: id, active: true }).lean();
};
module.exports = {
  create,
  deleteOne,
  getAll,
  getOneById,
  updateOne,
  getByClassRoomId,
  deleteMany,
};
