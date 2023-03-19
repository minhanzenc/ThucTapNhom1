const Account = require("../models/AccountModel");

const getAll = () => {
  return Account.find({ active: true });
};

const getAllInActive = () => {
  return Account.find({ active: false });
};

const getByEmail = (email) => {
  return Account.findOne({ email });
};

const getByUsername = (username) => {
  return Account.findOne({ username });
};

const deleteOne = (id, session) => {
  return Account.findOneAndUpdate(
    { _id: id },
    { active: false },
    { new: true }
  ).session(session);
};

const updateOne = ({ id, name, phone, email, address }, session) => {
  return Account.findOneAndUpdate(
    { _id: id },
    { name, phone, email, address, updatedAt: new Date() },
    { new: true }
  ).session(session);
};

const updatePassword = ({ id, password }, session) => {
  return Account.findOneAndUpdate(
    { _id: id },
    { password, updatedAt: new Date() },
    { new: true }
  ).session(session);
};

module.exports = {
  getAll,
  getByEmail,
  getAllInActive,
  getByUsername,
  deleteOne,
  updateOne,
  updatePassword,
};
