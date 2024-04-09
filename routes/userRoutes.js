const express = require('express');
const { body } = require('express-validator');
const { register, getProfile ,updateProfile} = require('../controllers/userController');
//const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User registration route
router.post('/register', [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], register);

// User profile route
// router.get('/profile', getProfile);
router.get('/:id/profile', getProfile);

// PUT update user profile by ID
router.put('/:id/profile', updateProfile);

module.exports = router;
