const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get notifications
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [notifications] = await db.query('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [req.userId]);
    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to get notifications' });
  }
});

// Mark notification as read
router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    await db.query('UPDATE notifications SET is_read = TRUE WHERE id = ?', [req.params.id]);
    res.json({ message: 'Marked as read' });
  } catch (error) {
    console.error('Mark notification error:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

module.exports = router;