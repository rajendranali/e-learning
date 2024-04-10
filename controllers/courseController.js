// controllers/courseController.js
const Course = require('../model/course');

// GET all courses with optional filtering and pagination
const getCourses = async (req, res) => {
    try {
      // Retrieve query parameters from req.query
      const { category, level, popularity, page, pageSize } = req.query;
  
      // Construct an object with the query parameters
      const queryParams = {
        category,
        level,
        popularity,
        page: parseInt(page) || 1, // Parse page as an integer or default to 1
        pageSize: parseInt(pageSize) || 10 // Parse pageSize as an integer or default to 10
      };
  
      // Log the received query parameters (optional)
      console.log('Query parameters:', queryParams);
  
      // Implement logic to fetch courses with optional filtering and pagination
      const courses = await Course.getCourses(queryParams);
  
      // Send the courses as a response
      res.status(200).json({ courses });
    } catch (error) {
      // Handle errors
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

// POST create a new course (Superadmin only)
const createCourse = async (req, res) => {
  try {
    // Implement logic to create a new course
    const newCourse = await Course.createCourse(req.body);
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET a specific course by ID
const getCourseById = async (req, res) => {
  try {
    // Implement logic to fetch a specific course by ID
    const course = await Course.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ course });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// PUT update a course by ID (Superadmin only)
const updateCourse = async (req, res) => {
  try {
    // Implement logic to update a course by ID
    const updatedCourse = await Course.updateCourse(req.params.id, req.body);
    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE a course by ID (Superadmin only)
const deleteCourse = async (req, res) => {
  try {
    // Implement logic to delete a course by ID
    const deletedCourse = await Course.deleteCourse(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully', course: deletedCourse });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getCourses, createCourse, getCourseById, updateCourse, deleteCourse };

