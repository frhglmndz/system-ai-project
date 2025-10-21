const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authMiddleware, doctorOnly } = require('../middleware/auth');

const router = express.Router();

// Get medications
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.json([]);
    }

    const [medications] = await db.query('SELECT * FROM medications WHERE patient_id = ? ORDER BY created_at DESC', [patients[0].id]);
    res.json(medications);
  } catch (error) {
    console.error('Get medications error:', error);
    res.status(500).json({ error: 'Failed to get medications' });
  }
});

// Add medication (doctor only)
router.post('/', authMiddleware, doctorOnly, async (req, res) => {
  try {
    const { patientId, name, dosage, frequency, startDate, endDate } = req.body;
    const id = uuidv4();

    await db.query(
      'INSERT INTO medications (id, patient_id, name, dosage, frequency, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, patientId, name, dosage, frequency, startDate, endDate]
    );

    const [medications] = await db.query('SELECT * FROM medications WHERE id = ?', [id]);
    res.status(201).json({ message: 'Medication added', medication: medications[0] });
  } catch (error) {
    console.error('Add medication error:', error);
    res.status(500).json({ error: 'Failed to add medication' });
  }
});

// Mark medication as completed
router.put('/:id/complete', authMiddleware, async (req, res) => {
  try {
    await db.query('UPDATE medications SET is_active = FALSE WHERE id = ?', [req.params.id]);
    res.json({ message: 'Marked as completed' });
  } catch (error) {
    console.error('Complete medication error:', error);
    res.status(500).json({ error: 'Failed to mark as completed' });
  }
});

module.exports = router;