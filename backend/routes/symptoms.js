const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get symptoms
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.json([]);
    }

    const [symptoms] = await db.query('SELECT * FROM symptoms WHERE patient_id = ? ORDER BY recorded_at DESC', [patients[0].id]);
    res.json(symptoms);
  } catch (error) {
    console.error('Get symptoms error:', error);
    res.status(500).json({ error: 'Failed to get symptoms' });
  }
});

// Record symptom
router.post('/', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.status(404).json({ error: 'Patient record not found' });
    }

    const { symptomName, severity, description } = req.body;
    const id = uuidv4();

    await db.query(
      'INSERT INTO symptoms (id, patient_id, symptom_name, severity, description) VALUES (?, ?, ?, ?, ?)',
      [id, patients[0].id, symptomName, severity, description]
    );

    const [symptoms] = await db.query('SELECT * FROM symptoms WHERE id = ?', [id]);
    res.status(201).json({ message: 'Symptom recorded', symptom: symptoms[0] });
  } catch (error) {
    console.error('Record symptom error:', error);
    res.status(500).json({ error: 'Failed to record symptom' });
  }
});

module.exports = router;