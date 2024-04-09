const db = require("../configs/db");

const saveUser = async ({ name, email, password }) => {
  const query = `
    INSERT INTO userinfo (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email;
  `;
  const values = [name, email, password];
  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM userinfo WHERE email = $1";
  try {
    const { rows } = await db.query(query, [email]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};
const updateUserProfile = async (
  id,
  { name, email, profilePicture, bio, location }
) => {
  const query = `
      UPDATE userinfo
      SET name = $1, email = $2, profile_picture = $3, bio = $4, location = $5
      WHERE id = $6
      RETURNING id, name, email, profile_picture, bio, location;
    `;
  const values = [name, email, profilePicture, bio, location, id];
  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id) => {
  const query = "SELECT * FROM userinfo WHERE id = $1";
  try {
    const { rows } = await db.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};
module.exports = { saveUser, findUserByEmail, updateUserProfile, findUserById };
