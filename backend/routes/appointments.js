const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get appointments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.json([]);
    }

    const [appointments] = await db.query('SELECT * FROM appointments WHERE patient_id = ? ORDER BY appointment_date, appointment_time', [patients[0].id]);
    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Failed to get appointments' });
  }
});

// Create appointment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { patientId, title, appointmentDate, appointmentTime, location, notes } = req.body;
    const id = uuidv4();

    await db.query(
      'INSERT INTO appointments (id, patient_id, title, appointment_date, appointment_time, location, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, patientId, title, appointmentDate, appointmentTime, location, notes]
    );

    const [appointments] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
    res.status(201).json({ message: 'Appointment created', appointment: appointments[0] });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

module.exports = router;