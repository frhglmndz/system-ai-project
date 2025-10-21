const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get chat messages
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.json([]);
    }

    const [messages] = await db.query('SELECT * FROM chat_messages WHERE patient_id = ? ORDER BY created_at ASC', [patients[0].id]);
    res.json(messages);
  } catch (error) {
    console.error('Get chat messages error:', error);
    res.status(500).json({ error: 'Failed to get chat messages' });
  }
});

// Send message to AI assistant
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [req.userId]);
    if (patients.length === 0) {
      return res.status(404).json({ error: 'Patient record not found' });
    }

    const { message } = req.body;
    const userMsgId = uuidv4();

    // Save user message
    await db.query(
      'INSERT INTO chat_messages (id, patient_id, role, content) VALUES (?, ?, ?, ?)',
      [userMsgId, patients[0].id, 'user', message]
    );

    // Check for urgent keywords
    const urgentKeywords = ['chest pain', 'breathing', 'dizzy', 'bleeding', 'emergency', 'help'];
    const isUrgent = urgentKeywords.some(keyword => message.toLowerCase().includes(keyword));

    let alertCreated = false;
    let alertType = null;

    if (isUrgent) {
      const alertId = uuidv4();
      alertType = 'urgent_message';
      
      await db.query(
        'INSERT INTO chat_alerts (id, patient_id, alert_type, severity, message) VALUES (?, ?, ?, ?, ?)',
        [alertId, patients[0].id, alertType, 'high', `Patient reported: ${message}`]
      );

      alertCreated = true;
    }

    // Simulate AI response (You would call OpenAI/Gemini API here)
    const aiResponse = isUrgent 
      ? "I'm concerned about what you're experiencing. I've alerted your doctor. In the meantime, if this is an emergency, please call 911 or go to the nearest emergency room."
      : "Thank you for sharing that with me. How can I help you today?";

    const aiMsgId = uuidv4();
    await db.query(
      'INSERT INTO chat_messages (id, patient_id, role, content) VALUES (?, ?, ?, ?)',
      [aiMsgId, patients[0].id, 'assistant', aiResponse]
    );

    res.json({
      response: aiResponse,
      alertCreated,
      alertType
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;