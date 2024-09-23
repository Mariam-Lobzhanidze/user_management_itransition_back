const userModel = require("../models/UserModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blockUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.updateUserStatus(id, "blocked");
    res.json({ message: "User blocked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unblockUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.updateUserStatus(id, "active");
    res.json({ message: "User unblocked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
};
