const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function getAllUsers(req, res) {
  const users = await db.getAllUsers();
  res.json(users);
}

async function getAllAuthors(req, res) {
  const authors = await db.getAuthors();
  res.json(authors);
}

async function getRegularUsers(req, res) {
  const regularUsers = await db.getUsers();
  res.json(regularUsers);
}

async function getUser(req, res) {
  const userId = req.params.userId;
  const user = await db.getUser(userId);
  res.json(user);
}

async function createUser(req, res) {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      res.json({ error: "Cannot create user" });
    }
    // otherwise, store hashedPassword in DB
    const user = await db.createUser(email, hashedPassword);
    res.json(user);
  });
}

async function updateUser(req, res) {
  const userId = req.params.userId;
  const { role } = req.body;
  const user = await db.updateUser(userId, role);
  res.json(user);
}

async function deleteUser(req, res) {
  const userId = req.params.userId;
  const user = await db.deleteUser(userId);
  res.json(user);
}

module.exports = {
  getAllUsers,
  getAllAuthors,
  getRegularUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
