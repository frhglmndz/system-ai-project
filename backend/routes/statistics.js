const express = require('express');
const db = require('../db');
const { authMiddleware, doctorOnly } = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT * FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.json({ recoveryProgress: 0, medicationsTaken: 0, totalMedications: 0, upcomingAppointments: 0 });
    }

    const patient = patients[0];
    const [medications] = await db.query('SELECT COUNT(*) as total FROM medications WHERE patient_id = ? AND is_active = TRUE', [patient.id]);
    const [appointments] = await db.query('SELECT COUNT(*) as count FROM appointments WHERE patient_id = ? AND appointment_date >= CURDATE() AND is_completed = FALSE', [patient.id]);
    const [vitals] = await db.query('SELECT * FROM vitals WHERE patient_id = ? ORDER BY recorded_at DESC LIMIT 1', [patient.id]);

    res.json({
      recoveryProgress: patient.recovery_progress || 0,
      medicationsTaken: 0,
      totalMedications: medications[0].total,
      upcomingAppointments: appointments[0].count,
      recentVitals: vitals[0] || null
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Get doctor dashboard stats (doctor only)
router.get('/doctor-stats', authMiddleware, doctorOnly, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT COUNT(*) as count FROM patients');
    const [alerts] = await db.query('SELECT COUNT(*) as count FROM chat_alerts WHERE is_resolved = FALSE');
    const [appointments] = await db.query('SELECT COUNT(*) as count FROM appointments WHERE appointment_date = CURDATE()');

    res.json({
      totalPatients: patients[0].count,
      activeAlerts: alerts[0].count,
      todayAppointments: appointments[0].count,
      patientsNeedingAttention: alerts[0].count
    });
  } catch (error) {
    console.error('Get doctor stats error:', error);
    res.status(500).json({ error: 'Failed to get doctor stats' });
  }
});

module.exports = router;