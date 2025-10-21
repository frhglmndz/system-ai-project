const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const doctorOnly = (req, res, next) => {
  if (req.userRole !== 'doctor') {
    return res.status(403).json({ error: 'Access denied. Doctors only.' });
  }
  next();
};

module.exports = { authMiddleware, doctorOnly };
