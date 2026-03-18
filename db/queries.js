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

exports.makeUserMember = async (id) => {
  await pool.query(
    "UPDATE users SET is_member = TRUE where id = $1",
    [id]
  );
}

exports.makeUserAdmin = async (id) => {
  await pool.query(
    "UPDATE users SET is_admin = TRUE where id = $1",
    [id]
  );
}

exports.addPost = async ({ used_id, title, body }) => {
  await pool.query(
    "INSERT INTO posts (user_id, title, body) VALUES ($1, $2, $3)",
    [used_id, title, body]
  );
}

exports.getAllPosts = async () => {
  const { rows } = await pool.query("SELECT u.firstname, u.lastname, p.title, p.body, p.created_at FROM posts p JOIN users u ON p.user_id=u.id");
  return rows;
}

exports.deletePost = async ({ id }) => {
  await pool.query(
    "DELETE FROM posts WHERE id = $1",
    [id]
  );
}