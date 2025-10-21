const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = 'patient' } = req.body;

    // Check if user exists
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    // Insert user
    await db.query(
      'INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [userId, email, hashedPassword, role]
    );

    // Create profile
    const profileId = uuidv4();
    await db.query(
      'INSERT INTO profiles (id, user_id, first_name, last_name) VALUES (?, ?, ?, ?)',
      [profileId, userId, firstName, lastName]
    );

    // If patient, create patient record
    if (role === 'patient') {
      const patientId = uuidv4();
      await db.query(
        'INSERT INTO patients (id, user_id) VALUES (?, ?)',
        [patientId, userId]
      );
    }

    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      user: { id: userId, email, role },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: { id: user.id, email: user.email, role: user.role },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, email, role FROM users WHERE id = ?', [req.userId]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: users[0] });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

module.exports = router;