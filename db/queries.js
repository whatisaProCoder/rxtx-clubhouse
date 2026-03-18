const pool = require("./pool");

exports.getUserUsingEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
}

exports.getUserUsingID = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

exports.addUser = async ({ firstname, lastname, email, hashedPassword }) => {
  await pool.query(
    "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
    [firstname, lastname, email, hashedPassword]
  );
}

exports.addPost = async ({ used_id, title, body }) => {
  await pool.query(
    "INSERT INTO posts (user_id, title, body) VALUES ($1, $2, $3)",
    [used_id, title, body]
  );
}

exports.getPost = async ({ id }) => {
  const { rows } = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );

  return rows[0];
}

exports.getAllPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}

exports.deletePost = async ({ id }) => {
  await pool.query(
    "DELETE FROM posts WHERE id = $1",
    [id]
  );
}