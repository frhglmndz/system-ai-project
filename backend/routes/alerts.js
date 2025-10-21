const express = require('express');
const db = require('../db');
const { authMiddleware, doctorOnly } = require('../middleware/auth');

const router = express.Router();

// Get alerts (doctor only)
router.get('/', authMiddleware, doctorOnly, async (req, res) => {
  try {
    const [alerts] = await db.query(`
      SELECT ca.*, pr.first_name, pr.last_name,
      CONCAT(pr.first_name, ' ', pr.last_name) as patient_name
      FROM chat_alerts ca
      JOIN patients p ON ca.patient_id = p.id
      JOIN profiles pr ON p.user_id = pr.user_id
      WHERE ca.is_resolved = FALSE
      ORDER BY ca.created_at DESC
    `);
    res.json(alerts);
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ error: 'Failed to get alerts' });
  }
});

// Resolve alert (doctor only)
router.put('/:id/resolve', authMiddleware, doctorOnly, async (req, res) => {
  try {
    await db.query('UPDATE chat_alerts SET is_resolved = TRUE WHERE id = ?', [req.params.id]);
    res.json({ message: 'Alert resolved' });
  } catch (error) {
    console.error('Resolve alert error:', error);
    res.status(500).json({ error: 'Failed to resolve alert' });
  }
});

module.exports = router;