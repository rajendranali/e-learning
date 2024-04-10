// models/enrollmentModel.js
const db = require("../configs/db");

const enrollUserInCourse = async (userId, courseId) => {
  const query = `
    INSERT INTO user_enrollment (user_id, course_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, course_id) DO NOTHING
    RETURNING user_id, course_id;
  `;
  const values = [userId, courseId];
  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getEnrolledCoursesByUserId = async (userId) => {
  const query = `
    SELECT course_id FROM user_enrollment
    WHERE user_id = $1;
  `;
  try {
    const { rows } = await db.query(query, [userId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { enrollUserInCourse, getEnrolledCoursesByUserId };
