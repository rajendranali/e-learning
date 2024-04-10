// routes/enrollmentRoutes.js
const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollController");

// Enroll user in course
router.post("/enroll", enrollmentController.enrollUserInCourse);

// Get enrolled courses by user ID
router.get("/:userId/courses", enrollmentController.getEnrolledCoursesByUserId);

module.exports = router;
