// controllers/enrollmentController.js
const enrollmentModel = require("../model/enroll");

const { Resend } = require('resend');

// Instantiate Resend with your API key
const resend = new Resend('re_Q2cWK9oX_56DFtYATdtgyNRK1KQ3q2WdU');

const enrollUserInCourse = async (req, res, next) => {
  const { userId, courseId } = req.body;
  try {
    // Enroll the user in the course
    const enrollment = await enrollmentModel.enrollUserInCourse(userId, courseId);

    // Get the user's email address
    const user = await userModel.findUserById(userId);
    const userEmail = user.email;

    // Define the email data
    const emailData = {
      from: 'Your App <noreply@yourapp.com>',
      to: [userEmail],
      subject: 'Course Enrollment Confirmation',
      html: `Dear User,<br><br>You have successfully enrolled in the course.`,
    };

    // Send the email
    const { error } = await resend.emails.send(emailData);
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully');
    }

    // Respond with the enrollment details
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
