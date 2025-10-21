const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get vitals
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.json([]);
    }

    const [vitals] = await db.query('SELECT * FROM vitals WHERE patient_id = ? ORDER BY recorded_at DESC', [patients[0].id]);
    res.json(vitals);
  } catch (error) {
    console.error('Get vitals error:', error);
    res.status(500).json({ error: 'Failed to get vitals' });
  }
});

// Record vitals
router.post('/', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.status(404).json({ error: 'Patient record not found' });
    }

    const { bloodPressureSystolic, bloodPressureDiastolic, heartRate, temperature, oxygenSaturation, weight } = req.body;
    const id = uuidv4();

    await db.query(
      'INSERT INTO vitals (id, patient_id, blood_pressure_systolic, blood_pressure_diastolic, heart_rate, temperature, oxygen_saturation, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, patients[0].id, bloodPressureSystolic, bloodPressureDiastolic, heartRate, temperature, oxygenSaturation, weight]
    );

    const [vitals] = await db.query('SELECT * FROM vitals WHERE id = ?', [id]);
    res.status(201).json({ message: 'Vitals recorded', vital: vitals[0] });
  } catch (error) {
    console.error('Record vitals error:', error);
    res.status(500).json({ error: 'Failed to record vitals' });
  }
});

module.exports = router;