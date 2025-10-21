const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get health tips
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [tips] = await db.query('SELECT * FROM health_tips ORDER BY created_at DESC');
    res.json(tips);
  } catch (error) {
    console.error('Get health tips error:', error);
    res.status(500).json({ error: 'Failed to get health tips' });
  }
});

// Save health tip
router.post('/:id/save', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.status(404).json({ error: 'Patient record not found' });
    }

    const id = uuidv4();
    await db.query(
      'INSERT INTO saved_health_tips (id, patient_id, health_tip_id) VALUES (?, ?, ?)',
      [id, patients[0].id, req.params.id]
    );

    res.json({ message: 'Tip saved' });
  } catch (error) {
    console.error('Save health tip error:', error);
    res.status(500).json({ error: 'Failed to save health tip' });
  }
});

// Get saved health tips
router.get('/saved', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.json([]);
    }

    const [tips] = await db.query(`
      SELECT ht.* FROM health_tips ht
      JOIN saved_health_tips sht ON ht.id = sht.health_tip_id
      WHERE sht.patient_id = ?
      ORDER BY sht.created_at DESC
    `, [patients[0].id]);
    
    res.json(tips);
  } catch (error) {
    console.error('Get saved health tips error:', error);
    res.status(500).json({ error: 'Failed to get saved health tips' });
  }
});

module.exports = router;