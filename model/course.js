// models/course.js
const db = require('../configs/db');

// Function to fetch all courses with optional filtering and pagination
const getCourses = async ({ category, level, popularity, page = 1, pageSize = 10 }) => {
    let query = 'SELECT * FROM courses';
    const values = [];
  
    // Add filtering conditions if provided
    if (category || level || popularity) {
      query += ' WHERE 1=1';
  
      if (category) {
        query += ' AND category = $1';
        values.push(category);
      }
      if (level) {
        query += ' AND level = $2';
        values.push(level);
      }
      if (popularity) {
        query += ' AND popularity >= $3';
        values.push(popularity);
      }
    }
  
    // Add pagination
    const offset = (page - 1) * pageSize;
    query += ' OFFSET $' + (values.length + 1) + ' LIMIT $' + (values.length + 2);
    values.push(offset, pageSize);
  
    try {
      const { rows } = await db.query(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  };
  
  

// Function to create a new course (Superadmin only)
const createCourse = async ({ title, category, level, popularity }) => {
  const query = `
    INSERT INTO courses (title, category, level, popularity)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [title, category, level, popularity];
  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to fetch a specific course by ID
const getCourseById = async (id) => {
  const query = 'SELECT * FROM courses WHERE id = $1';
  try {
    const { rows } = await db.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to update a course by ID (Superadmin only)
const updateCourse = async (id, { title, category, level, popularity }) => {
  const query = `
    UPDATE courses
    SET title = $1, category = $2, level = $3, popularity = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [title, category, level, popularity, id];
  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to delete a course by ID (Superadmin only)
const deleteCourse = async (id) => {
  const query = 'DELETE FROM courses WHERE id = $1 RETURNING *';
  try {
    const { rows } = await db.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { getCourses, createCourse, getCourseById, updateCourse, deleteCourse };
