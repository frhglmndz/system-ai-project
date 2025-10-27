const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Patient Recovery API Server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/medications', require('./routes/medications'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/vitals', require('./routes/vitals'));
app.use('/api/symptoms', require('./routes/symptoms'));
app.use('/api/health-tips', require('./routes/health-tips'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/recovery-plans', require('./routes/recovery-plans'));
app.use('/api/dashboard', require('./routes/statistics'));

// Error handling
app.use(require('./routes/error'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});