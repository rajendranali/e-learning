// controllers/enrollmentController.js
const enrollmentModel = require("../model/enroll");

const enrollUserInCourse = async (req, res, next) => {
  const { userId, courseId } = req.body;
  try {
    const enrollment = await enrollmentModel.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  } catch (error) {
    next(error);
  }
};

const getEnrolledCoursesByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const enrolledCourses = await enrollmentModel.getEnrolledCoursesByUserId(userId);
    res.json(enrolledCourses);
  } catch (error) {
    next(error);
  }
};

module.exports = { enrollUserInCourse, getEnrolledCoursesByUserId };
