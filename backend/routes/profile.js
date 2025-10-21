const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [profiles] = await db.query('SELECT * FROM profiles WHERE user_id = ?', [req.userId]);
    if (profiles.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profiles[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update profile
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, phone, dateOfBirth, avatarUrl } = req.body;
    
    await db.query(
      'UPDATE profiles SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, avatar_url = ? WHERE user_id = ?',
      [firstName, lastName, phone, dateOfBirth, avatarUrl, req.userId]
    );

    const [profiles] = await db.query('SELECT * FROM profiles WHERE user_id = ?', [req.userId]);
    res.json({ message: 'Profile updated', profile: profiles[0] });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;