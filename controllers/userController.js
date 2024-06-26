const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { saveUser, findUserByEmail,findUserById } = require('../model/user');
const User = require('../model/user');


import { Resend } from 'resend';

// Instantiate Resend with your API key
const resend = new Resend('re_Q2cWK9oX_56DFtYATdtgyNRK1KQ3q2WdU');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await saveUser({ name, email, password: hashedPassword });

    // Define the email data
    const emailData = {
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Our Platform!',
      html: `<strong>Dear ${name},</strong><br><br>Welcome to our platform. You have successfully registered.`,
    };

    // Send the email
    const { error } = await resend.emails.send(emailData);
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully');
    }

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// controllers/userController.js


// Get user profile by ID
const getProfile = async (req, res) => {
  const { id } = req.params; // Extract user ID from URL parameters
  try {
    // Fetch user profile based on user ID
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user profile by ID
const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, profilePicture, bio, location } = req.body;
    try {
      // Update user profile
      const updatedUser = await User.updateUserProfile(id, { name, email, profilePicture, bio, location });
      res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = { register, getProfile,updateProfile };
