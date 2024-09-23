const pool = require("../config/db");

const createUser = async (name, email, password) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, registration_time, status) VALUES (?, ?, ?, NOW(), ?)",
      [name, email, password, "active"]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const findUserById = async (userId) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const updateUserStatus = async (id, status) => {
  try {
    await pool.query("UPDATE users SET status = ? WHERE id = ?", [status, id]);
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

const updateLastLoginTime = async (userId) => {
  const query = "UPDATE users SET lastLoginTime = NOW() WHERE id = ?";
  const [result] = await pool.query(query, [userId]);
  return result;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserStatus,
  deleteUser,
  getAllUsers,
  updateLastLoginTime,
};
