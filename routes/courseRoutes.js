const express = require('express');
const { getCourses, createCourse, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController');
const authorizeSuperadmin = require('../Middlewares/authMiddleware');

const router = express.Router();

// GET all courses with optional filtering and pagination
router.get('/courses', getCourses);

// POST create a new course (Superadmin only)
router.post('/courses', authorizeSuperadmin, createCourse);

// GET a specific course by ID
router.get('/courses/:id', getCourseById);

// PUT update a course by ID (Superadmin only)
router.put('/courses/:id', authorizeSuperadmin, updateCourse);

// DELETE a course by ID (Superadmin only)
router.delete('/courses/:id', authorizeSuperadmin, deleteCourse);

module.exports = router;

