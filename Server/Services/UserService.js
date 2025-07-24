const User = require('../Models/User');
const repo = require('../Repositories/UserRepository');

async function registerOrUpdate(userData) {
  const user = new User(userData);
  return await repo.createUser(user);
}

async function getAllUsers() {
  const users = await repo.getAllUsers();
  return users.map(u => new User(u));
}

async function getUserById(id) {
  const u = await repo.getUserById(id);
  return new User(u);
}

async function updateUser(body) {
  const original = await repo.getUserById(body.id);
  if (!original) {
    throw new Error("User not found");
  }

  // PROFILE PICTURE WILL SYNC WITH AUTH0 (REMOVE AFTER ADDING OTHER EDITABLES)
  const updatedUser = {
    profilePicture: body.profilePicture ?? original.profilePicture
  };

  const updated = await repo.updateUser(body.id, updatedUser);
  return new User(updated);
}


async function deleteUser(id) {
  return await repo.deleteUser(id);
}

module.exports = {
  registerOrUpdate,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
