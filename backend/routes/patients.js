const express = require('express');
const db = require('../db');
const { authMiddleware, doctorOnly } = require('../middleware/auth');

const router = express.Router();

// Get all patients (doctor only)
router.get('/', authMiddleware, doctorOnly, async (req, res) => {
  try {
    const [patients] = await db.query(`
      SELECT p.*, pr.first_name, pr.last_name 
      FROM patients p
      JOIN profiles pr ON p.user_id = pr.user_id
    `);
    res.json(patients);
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ error: 'Failed to get patients' });
  }
});

// Get patient by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    if (patients.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patients[0]);
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({ error: 'Failed to get patient' });
  }
});

// Update patient (doctor only)
router.put('/:id', authMiddleware, doctorOnly, async (req, res) => {
  try {
    const { doctorId, bloodType, allergies, medicalConditions, recoveryProgress } = req.body;
    
    await db.query(
      'UPDATE patients SET doctor_id = ?, blood_type = ?, allergies = ?, medical_conditions = ?, recovery_progress = ? WHERE id = ?',
      [doctorId, bloodType, allergies, medicalConditions, recoveryProgress, req.params.id]
    );

    const [patients] = await db.query('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    res.json({ message: 'Patient updated', patient: patients[0] });
  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({ error: 'Failed to update patient' });
  }
});

module.exports = router;