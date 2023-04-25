const classRoom = require("../models/ClassRoomModel");

const create = ({ name, period, r_teacher, r_subject }, session) => {
  return classRoom.create([{ name, period, r_teacher, r_subject }], {
    session,
  });
};
const deleteOne = (id, session) => {
  return classRoom.findByIdAndDelete(id, { session });
};
// const getAll = (teacherId) => {
//     return classRoom.find({ active: true, r_teacher: teacherId})
// }
const getAll = async (teacherId, { page = 1, pageSize = 10 }) => {
  const take = (page - 1) * pageSize;
  const [countClassroom, classRooms] = await Promise.all([
    classRoom.count({}),
    classRoom
      .find({ r_teacher: teacherId })
      .skip(take)
      .limit(pageSize)
      .sort({ _id: -1 })
      .lean(),
  ]);
  return {
    total: countClassroom,
    classRooms,
  };
};

const getByTeacherId = (teacherId) => {
  return classRoom.find({
    r_teacher: teacherId,
  });
};
const getBySubjectId = (subjectId) => {
  return classRoom.find({
    r_subject: subjectId,
  });
};
const updateOne = ({ id, name, period, r_teacher, r_subject }, session) => {
  return classRoom
    .findOneAndUpdate(
      { _id: id },
      { name, period, r_teacher, r_subject },
      { new: true }
    )
    .session(session);
};
const getOneById = (id) => {
  return classRoom.findById({ _id: id, active: true }).lean();
};
module.exports = {
  create,
  deleteOne,
  getAll,
  getOneById,
  updateOne,
  getByTeacherId,
  getBySubjectId,
};
