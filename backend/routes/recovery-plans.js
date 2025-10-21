const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authMiddleware, doctorOnly } = require('../middleware/auth');

const router = express.Router();

// Get recovery plans
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.json([]);
    }

    const [plans] = await db.query('SELECT * FROM recovery_plans WHERE patient_id = ? ORDER BY created_at DESC', [patients[0].id]);
    res.json(plans);
  } catch (error) {
    console.error('Get recovery plans error:', error);
    res.status(500).json({ error: 'Failed to get recovery plans' });
  }
});

// Create recovery plan (doctor only)
router.post('/', authMiddleware, doctorOnly, async (req, res) => {
  try {
    const { patientId, title, description, dietPlan, exercisePlan, startDate, endDate } = req.body;
    const id = uuidv4();

    await db.query(
      'INSERT INTO recovery_plans (id, patient_id, title, description, diet_plan, exercise_plan, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, patientId, title, description, dietPlan, exercisePlan, startDate, endDate]
    );

    const [plans] = await db.query('SELECT * FROM recovery_plans WHERE id = ?', [id]);
    res.status(201).json({ message: 'Plan created', plan: plans[0] });
  } catch (error) {
    console.error('Create recovery plan error:', error);
    res.status(500).json({ error: 'Failed to create recovery plan' });
  }
});

module.exports = router;