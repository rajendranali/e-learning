// models/enrollmentModel.js
const db = require("../configs/db");
const enrollUserInCourse = async (userId, courseId) => {
    try {
      // Check if the user exists in the userinfo table
      const userExistsQuery = `
        SELECT 1 FROM userinfo WHERE id = $1;
      `;
      const userExistsResult = await db.query(userExistsQuery, [userId]);
  
      // If the user does not exist, throw an error
      if (userExistsResult.rows.length === 0) {
        throw new Error('User does not exist.');
      }
  
      // User exists, proceed with enrollment
      const query = `
        INSERT INTO user_enrollment (user_id, course_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, course_id) DO NOTHING
        RETURNING user_id, course_id;
      `;
      const values = [userId, courseId];
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  };
  
  

  const getEnrolledCoursesByUserId = async (userId) => {
    const query = `
      SELECT courses.*
      FROM user_enrollment
      JOIN courses ON user_enrollment.course_id = courses.id
      WHERE user_enrollment.user_id = $1;
    `;
    try {
      const { rows } = await db.query(query, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  };
  

module.exports = { enrollUserInCourse, getEnrolledCoursesByUserId };
