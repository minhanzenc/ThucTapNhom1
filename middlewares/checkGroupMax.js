require("dotenv").config();
const GroupStudentModel = require("../models/GroupStudentModel");
const ConditionCreateGroupModel = require("../models/ConditiontoCreateGroupModel");
const Group = require("../models/GroupModel");

const checkGroupMax = async (req, res, next) => {
  try {
    const { r_group } = req.body;
    const group = await Group.findById(r_group);
    const condition = await ConditionCreateGroupModel.findOne({
      r_classroom: group.r_classroom,
    });
    const count = await GroupStudentModel.countDocuments({ r_group });
    if (count >= condition.max) {
      throw new Error("Đã đạt đến số lượng tối đa trong group");
    }
    req.group = group;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { checkGroupMax };
