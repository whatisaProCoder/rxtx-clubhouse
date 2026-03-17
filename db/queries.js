const pool = require("./pool");

exports.getUserUsingEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
}

exports.getUserUsingID = async (id) => {
  const { rows } = await pool.query("SELEECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

exports.addUser = async ({ firstName, lastName, email, hashedPassword }) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, email, hashedPassword]
  );
}