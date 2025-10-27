const express = require('express');
const router = express.Router();
const userProfile = require('../models/userProfile');

/**
 * @route   GET /api/profile/:id
 * @desc    Get user profile by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const profile = userProfile.getProfile(id);

    if (!profile) {
      return res.status(404).json({ 
        error: 'Profile not found',
        message: `No profile found with ID: ${id}` 
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

/**
 * @route   GET /api/profile
 * @desc    Get all profiles
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    const profiles = userProfile.getAllProfiles();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

/**
 * @route   PUT /api/profile/:id
 * @desc    Update user profile
 * @access  Public
 */
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate required fields if email is being updated
    if (updates.email && !isValidEmail(updates.email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        message: 'Please provide a valid email address' 
      });
    }

    const updatedProfile = userProfile.updateProfile(id, updates);

    if (!updatedProfile) {
      return res.status(404).json({ 
        error: 'Profile not found',
        message: `No profile found with ID: ${id}` 
      });
    }

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

/**
 * @route   POST /api/profile
 * @desc    Create a new user profile
 * @access  Public
 */
router.post('/', (req, res) => {
  try {
    const profileData = req.body;

    // Validate required fields
    if (!profileData.email) {
      return res.status(400).json({ 
        error: 'Missing required field',
        message: 'Email is required' 
      });
    }

    if (!isValidEmail(profileData.email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        message: 'Please provide a valid email address' 
      });
    }

    const newProfile = userProfile.createProfile(profileData);
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

/**
 * Helper function to validate email format
 * Note: This is a basic validation. For production use, consider
 * using a dedicated library like validator.js for more robust validation
 */
function isValidEmail(email) {
  // Simple email validation that avoids ReDoS vulnerabilities
  // Checks: has @, has content before and after @, has . after @
  if (typeof email !== 'string' || email.length === 0) {
    return false;
  }
  
  const atIndex = email.indexOf('@');
  if (atIndex <= 0 || atIndex === email.length - 1) {
    return false;
  }
  
  const domain = email.substring(atIndex + 1);
  const dotIndex = domain.indexOf('.');
  if (dotIndex <= 0 || dotIndex === domain.length - 1) {
    return false;
  }
  
  // Check for whitespace
  if (email.includes(' ')) {
    return false;
  }
  
  return true;
}

module.exports = router;
