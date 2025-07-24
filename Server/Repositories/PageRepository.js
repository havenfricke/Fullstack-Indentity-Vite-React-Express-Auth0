const db = require('../DB/DbConnection');

async function getAllPages() {
  const sql = 'SELECT * FROM pages';
  return await db.query(sql, []);
}

async function getPageById(id) {
  const sql = 'SELECT * FROM pages WHERE id = ?';
  const result = await db.query(sql, [id]);
  return result[0]; // return exactly one
}

async function createPage(id, body) {
  const sql = 'INSERT INTO pages (id, name) VALUES (?, ?)';
  await db.query(sql, [id, body.name]);
  return { id, name: body.name };
}

async function editPage(id, body) {
  const sql = 'UPDATE pages SET name = ? WHERE id = ?';
  await db.query(sql, [body.name, id]);
  return { id, name: body.name };
}

async function deletePage(id) {
  const sql = 'DELETE FROM pages WHERE id = ?';
  const result = await db.query(sql, [id]);
  return result; 
}

module.exports = {
  getAllPages,
  getPageById,
  createPage,
  editPage,
  deletePage
};
