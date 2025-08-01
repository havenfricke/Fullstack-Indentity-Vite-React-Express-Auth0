// UserRepository.js
const db = require('../DB/DbConnection');

async function createUser(user) {
  const sql = `INSERT INTO users (auth0Id, email, username, role, profilePicture)
               VALUES (?, ?, ?, ?, ?)
               ON DUPLICATE KEY UPDATE email = VALUES(email), username = VALUES(username), profilePicture = VALUES(profilePicture)`;
  await db.query(sql, [user.auth0Id, user.email, user.username, user.role, user.profilePicture]);
  return getUserByAuth0Id(user.auth0Id);
}

async function getUserByAuth0Id(auth0Id) {
  const sql = `SELECT * FROM users WHERE auth0Id = ?`;
  const res = await db.query(sql, [auth0Id]);
  return res[0];
}

async function getAllUsers() {
  const sql = 'SELECT * FROM users';
  return db.query(sql);
}

async function getUserById(id) {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const res = await db.query(sql, [id]);
  return res[0];
}

async function updateUser(id, data) {
  const sql = `
    UPDATE users 
    SET username = ?, profilePicture = ?
    WHERE id = ?
  `;

  // PROFILE & USERNAME PICTURE WILL SYNC WITH AUTH0 (REMOVE AFTER ADDING OTHER EDITABLES)
  const values = [
    data.username,
    data.profilePicture,
    id // Ensure id is last in the values array
  ];

  console.log('Updating user with values:', values);
  await db.query(sql, values);
  return getUserById(id);
}

async function deleteUser(id) {
  const sql = 'DELETE FROM users WHERE id = ?';
  return db.query(sql, [id]);
}

module.exports = {
  createUser,
  getUserByAuth0Id,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
